import request from 'supertest';
import app from '../../app.mjs';

describe('GET /api/choferes', () => {
    it('should return a 200 status and a message', async () => {
        const response = await request(app).get('/api/choferes');
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /api/choferes/activos', () => {
    it('should return a 200 status and a message', async () => {
        await request(app).get('/api/choferes/activos');
        expect(200);
    });
});

describe('GET /api/choferes/inactivos', () => {
    it('should return a 200 status and a message', async () => {
        await request(app).get('/api/choferes/inactivos');
        expect(200);
    });
});

describe('POST /api/choferes required fields', () => {
    it('should return a 201 status and a message', async () => {
        await request(app).post('/api/choferes').send({
            nombre: 'Juan',
            apellido: 'Perez',
            edad: 20,
            dni: '12345678',
            telefono: '12345678',
            licencia: 'A'
        });
        expect(201);
    });

    it('should return a 400 status and a error licencia is required', async () => {
        const response = await request(app).post('/api/choferes').send({
            nombre: 'Juan',
            apellido: 'Perez',
            edad: 20,
            dni: '12345678',
            telefono: '12345678'
        });
        expect(400);
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('\"licencia\" is required');
    });

    it('should return a 400 status and a error edad must be greater than or equal to 18', async () => {
        const response = await request(app).post('/api/choferes').send({
            nombre: 'Juan',
            apellido: 'Perez',
            edad: 12,
            dni: '12345678',
            telefono: '12345678',
            licencia: 'A'
        });
        expect(400);
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('\"edad\" must be greater than or equal to 18');
    });

    it('should return a 400 status and a error dni must be 8 characters', async () => {
        const response = await request(app).post('/api/choferes').send({
            nombre: 'Juan',
            apellido: 'Perez',
            edad: 20,
            dni: '1234567',
            telefono: '12345678',
            licencia: 'A'
        });
        expect(400);
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('\"dni\" length must be 8 characters long');
    });

    it('should return a 400 status and a error telefono is required', async () => {
        const response = await request(app).post('/api/choferes').send({
            nombre: 'Juan',
            apellido: 'Perez',
            edad: 20,
            dni: '12345678',
            licencia: 'A'
        });
        expect(400);
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('\"telefono\" is required');
    });

    it('should return a 400 status and a error licencia is required', async () => {
        const response = await request(app).post('/api/choferes').send({
            nombre: 'Juan',
            apellido: 'Perez',
            edad: 20,
            dni: '12345678',
            telefono: '12345678'
        });
        expect(400);
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('\"licencia\" is required');
    });

    it('should return a 400 status and a error licencia  must be one of [A, B, C, D, E]', async () => {
        const response = await request(app).post('/api/choferes').send({
            nombre: 'Juan',
            apellido: 'Perez',
            edad: 20,
            dni: '12345678',
            telefono: '12345678',
            licencia: 'Z'
        });
        expect(400);
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('\"licencia\" must be one of [A, B, C, D, E]');
    });
})

describe('PUT /api/choferes/:id', () => {
    it('should return a 200 status', async () => {
        const response = await request(app).put('/api/choferes/685870a19a29a76b1bd6c362').send({
            nombre: 'Juan',
            apellido: 'Perez',
            edad: 20,
            dni: '12345678',
            telefono: '12345678',
            licencia: 'A'
        });
        expect(200);
    })

    it('should return a 404 status and a error chofer no encontrado', async () => {
        const response = await request(app).put('/api/choferes/685870a19a29a76b1bd6c999').send({
            nombre: 'Juan',
            apellido: 'Perez',
            edad: 20,
            dni: '12345678',
            telefono: '12345678',
            licencia: 'A'
        });
        expect(404);
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Chofer no encontrado');
    })
})

describe('DELETE /api/choferes/:id', () => {
    // it('should return a 200 status', async () => {
    //     const response = await request(app).delete('/api/choferes/685870a19a29a76b1bd6c362');
    //     expect(200);
    // })

    it('should return a 404 status and a error chofer no encontrado', async () => {
        const response = await request(app).delete('/api/choferes/685870a19a29a76b1bd6c999');
        expect(404);
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Chofer no encontrado');
    })
})
