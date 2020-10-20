import { Query } from '@rpgjs/server'
import { testing } from '@rpgjs/testing'
import RPGServer from '../src/server/rpg'

let  client, socket, player

beforeEach(() => {
    const fixture = testing(RPGServer)
    client = fixture.createClient()
    socket = client.connection()
    player = new Query().getPlayer(client)
})

test('test player', () => {
    expect(player).toBeDefined()
})