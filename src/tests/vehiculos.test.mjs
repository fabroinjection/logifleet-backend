import request from 'supertest';
import app from '../../app.mjs';

describe('GET /api/vehiculos', () => {
    it('should return a 200 status and a message', async () => {
        const response = await request(app).get('/api/vehiculos');
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /api/vehiculos/activos', () => {
    it('should return a 200 status and a message', async () => {
        const response = await request(app).get('/api/vehiculos/activos');
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /api/vehiculos/inactivos', () => {
    it('should return a 200 status and a message', async () => {
        const response = await request(app).get('/api/vehiculos/inactivos');
        expect(response.statusCode).toBe(200);
    })
});

describe('POST /api/vehiculos', () => {
    it('should return a 201 status (required fields)', async () => {
        await request(app).post('/api/vehiculos').send({
            marca: 'Renault',
            modelo: 'Kangoo',
            anio: 2020,
            patente: 'ABC123',
            tipo: 'Camioneta',
            estado: 'activo',
            chofer: '685870a19a29a76b1bd6c362'
        });
        expect(201);
    });

    it('should return a 201 status (all fields)', async () => {
        await request(app).post('/api/vehiculos').send({
            patente: 'AA111AA',
            nro_chasis: '1HGCM82633A123456',
            nro_motor: '1234567890',
            marca: 'Renault',
            modelo: 'Kangoo',
            anio: 2020,
            tipo: 'Sedan',
            capacidad: 5,
            chofer: '685870a19a29a76b1bd6c362'
        });
        expect(201);
    });

    it('should return a 400 status and an error message marca is required', async () => {
        await request(app).post('/api/vehiculos').send({
            modelo: 'Kangoo',
            anio: 2020,
            patente: 'ABC123',
            tipo: 'Camioneta',
            estado: 'activo',
            chofer: '685870a19a29a76b1bd6c362'
        });
        expect(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('\"marca\" is required');
    });
})
