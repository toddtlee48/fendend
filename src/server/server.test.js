let server = require('./server.js')
const supertest = require('supertest')
const app = require('./server')
describe('Express Endpoint', () => {
    it('should return data for pittsburgh', async() => {
        let dt = new Date().toISOString().split('T')[0];
        await supertest(app)
            .get('/image/:name')
            .query({
                place: "Pittsburgh",
                date: dt
            })
            .expect(200)
            
    })
})
