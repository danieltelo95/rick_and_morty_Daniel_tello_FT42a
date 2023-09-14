const app = require('../src/app');
const session = require('supertest');
const request = session(app);

const character = {
    id: 923,
    name: 'Daniel',
    gender: 'Male',
    status: 'Alive',
    origin:{
        name: 'Earth C-137'
    },
    image: 'image.jpg'
}

describe('Test de RUTAS', () => {
    describe("GET /rickandmorty/character/:id", () =>{
        it("Responde con status: 200", async () => {
            await request.get('/rickandmorty/character/1').expect(200);
        })

        it("Responde un objeto con las propiedades: 'id', 'name', 'species', 'gender', 'status', 'origin' e 'image' ",
        async () => {
            const response = await request.get('/rickandmorty/character/1');
            for(const prop in character){
                expect(response.body).toHaveProperty(prop)
            }
        })

        it('Si hay un error responde con status: 500', async () =>{
            const response = await request.get('/rickandmorty/character/14783643hd')
            expect(response.statusCode).toBe(500)
        })
    })
    
    describe("GET /rickandmorty/login", () => {
        it('Se obtiene un objeto con access: true si se le pasa el email y el password correctos',
        async () => {
            const response = await request.get('/rickandmorty/login?email=&password=')            
            const access = { access: true };
            expect(response.body).toEqual(access);
        })
    })

    describe("GET /rickandmorty/login", () => {
        it('Se obtiene un objeto con access: false si se le pasa el email y el password correctos',
        async () => {
            const response = await request.get('/rickandmorty/login?email=&password=dfsdf')            
            const access = { access: false };
            expect(response.body).toEqual(access);
        })
    })

    describe("POST /rickandmorty/fav", () => {
        it('Debe guardar el personaje en favoritos', async () => {
            const response = await request.post('/rickandmorty/fav').
            send(character)
            expect(response.body).toContainEqual(character)
        })
        it('Debe agregar personajes a favoritos sin eliminar los que ya están',
        async () => {
            character.id = 2945;
            character.name = 'Tello';
            const response = await request.post('/rickandmorty/fav').
            send(character)
            expect(response.body.length).toBe(2)
        })
    })

    describe("DELETE /rickandmorty/fav/:id", () => {
        it('Si el ID solicitado no existe, debe retornar un arreglo con todos los favoritos', 
        async () => {
            const response = await request.delete('/rickandmorty/fav/2')
            expect(response.body.length).toBe(2)
        })
        it('Si el id enviado existe, debería eliminarlo de favoritos',
        async ()=> {
            const response = await request.delete('/rickandmorty/fav/2945')
            expect(response.body.length).toBe(1)
        })
    })
})