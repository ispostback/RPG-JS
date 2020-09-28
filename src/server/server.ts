import { ServerEngine } from 'lance-gg';
import { SceneMap } from './Scenes/Map';
import { SceneBattle } from './Scenes/Battle';
import PlayerObject from './Player'

export default class RpgServerEngine extends ServerEngine {

    private playerClass: PlayerObject
    private scenes: Map<string, any> = new Map()
    
    constructor(private io, public gameEngine, private inputOptions) {
        super(io, gameEngine, inputOptions)
        this.playerClass = inputOptions.playerClass || PlayerObject
        this.loadScenes()
    }

    loadScenes() {
        this.scenes[SceneMap.id] =  new SceneMap(this.inputOptions.maps, this)
        this.scenes[SceneBattle.id] =  new SceneBattle(this)
    }

    getScene(name) {
        return this.scenes[name]
    }

    sendToPlayer(currentPlayer, eventName, data) {
        currentPlayer.socket.emit(eventName, data);
    }   

    onPlayerConnected(socket) {
        super.onPlayerConnected(socket)
        const player = this.gameEngine.addPlayer(this.playerClass, socket.playerId, true)
        player.socket = socket
        player.server = this
        player._init()
        player.execMethod('onConnected')
    }

    onPlayerDisconnected(socketId, playerId) {
        super.onPlayerDisconnected(socketId, playerId);
        const object = this.gameEngine.world.getObject(playerId)
        this.gameEngine.removeObjectFromWorld(object.id)
    }
}