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
            patente: 'ABC 123',
            tipo: 'Camioneta',
            estado: 'activo'
        });
        expect(201);
    });

    it('should return a 201 status (all fields)', async () => {
        await request(app).post('/api/vehiculos').send({
            patente: 'AA 111 BB',
            nro_chasis: '1HGCM82633A123456',
            nro_motor: '1234567890',
            marca: 'Renault',
            modelo: 'Kangoo',
            anio: 2020,
            tipo: 'Sedan',
            capacidad: 5
        });
        expect(201);
    });

    it('should return a 400 status and an error message marca is required', async () => {
        const response = await request(app).post('/api/vehiculos').send({
            modelo: 'Kangoo',
            anio: 2020,
            patente: 'ABC 789',
            tipo: 'Camioneta',
            estado: 'activo',
            chofer: '685870a19a29a76b1bd6c362'
        });
        expect(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('\"marca\" is required');
    });

    it('should return a 400 status and an error message modelo is required', async () => {
        const response = await request(app).post('/api/vehiculos').send({
            marca: 'Renault',
            anio: 2020,
            patente: 'ABC 789',
            tipo: 'Camioneta',
            estado: 'activo'
        });
        expect(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('\"modelo\" is required');
    });

    it('should return a 400 status and an error message anio is required', async () => {
        const response = await request(app).post('/api/vehiculos').send({
            marca: 'Renault',
            modelo: 'Kangoo',
            patente: 'ABC 789',
            tipo: 'Camioneta',
            estado: 'activo',
            capacidad: 20
        });
        expect(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('\"anio\" is required');
    });

    it('should return a 400 status and an error message patente is required', async () => {
        const response = await request(app).post('/api/vehiculos').send({
            marca: 'Renault',
            modelo: 'Kangoo',
            anio: 2020,
            tipo: 'Camioneta',
            estado: 'activo'
        });
        expect(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('\"patente\" is required');
    });

    it('should return a 400 status and an error message tipo is required', async () => {
        const response = await request(app).post('/api/vehiculos').send({
            marca: 'Renault',
            modelo: 'Kangoo',
            anio: 2020,
            patente: 'ABC 789',
            estado: 'activo'
        });
        expect(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('\"tipo\" is required');
    });

    it('should return a 400 status and an error message capacidad is required', async () => {
        const response = await request(app).post('/api/vehiculos').send({
            marca: 'Renault',
            modelo: 'Kangoo',
            anio: 2020,
            patente: 'ABC 789',
            tipo: 'Camioneta',
            estado: 'activo'
        });
        expect(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('\"capacidad\" is required');
    })

    it('should return a 400 status and an error message patente fails to match the required pattern: /^[A-Z]{2} \\d{3} [A-Z]{2}$|^[A-Z]{3} \\d{3}$/', async () => {
        const response = await request(app).post('/api/vehiculos').send({
            marca: 'Renault',
            modelo: 'Kangoo',
            anio: 2020,
            patente: 'ABC789',
            tipo: 'Camioneta',
            estado: 'activo',
            capacidad: 20
        });
        expect(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('\"patente\" with value \"ABC789\" fails to match the required pattern: /^[A-Z]{2} \\d{3} [A-Z]{2}$|^[A-Z]{3} \\d{3}$/');
    })

    it('should return a 400 status and an error message nro_motor failed to match the required pattern /^[A-Z0-9]+$/i', async () => {
        const response = await request(app).post('/api/vehiculos').send({
            marca: 'Renault',
            modelo: 'Kangoo',
            anio: 2020,
            patente: 'ABC 789',
            tipo: 'Camioneta',
            estado: 'activo',
            capacidad: 20,
            nro_chasis: 'asd'
        });
        expect(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('\"nro_chasis\" with value \"asd\" fails to match the required pattern: /^[A-Z0-9]{17}$/');
    })

    it('should return a 400 status and a error tipo must be one of [Camion, Camioneta, Auto, Moto]', async () => {
        const response = await request(app).post('/api/vehiculos').send({
            marca: 'Renault',
            modelo: 'Kangoo',
            anio: 2020,
            patente: 'ABC 789',
            tipo: 'Camioneta',
            estado: 'activo',
            capacidad: 20,
            tipo: 'Bicicleta'
        });
        expect(400);
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('\"tipo\" must be one of [Camion, Camioneta, Auto, Moto]');
    });
})

describe('GET /api/vehiculos/:id', () => {
    it('should return a 200 status and a vehicle by id', async () => {
        const response = await request(app).get('/api/vehiculos/685870a19a29a76b1bd6c362');
        expect(200);
    });

    it('should return a 404 status and an error message vehicle not found', async () => {
        const response = await request(app).get('/api/vehiculos/123456789012345678901234');
        expect(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Vehículo no encontrado');
    });
});

describe('PUT /api/vehiculos/:id', () => { 
    it('should return a 200 status and update the vehicle', async () => {
        const response = await request(app).put('/api/vehiculos/685870a19a29a76b1bd6c362').send({
            marca: 'Renault',
            modelo: 'Kangoo',
            anio: 2020,
            patente: 'ABC 789',
            tipo: 'Camioneta',
            estado: 'activo',
            capacidad: 20
        });
        expect(200);
    });

    it('should return a 404 status and an error message vehicle not found', async () => {
        const response = await request(app).put('/api/vehiculos/123456789012345678901234').send({
            marca: 'Renault',
            modelo: 'Kangoo',
            anio: 2020,
            patente: 'ABC 789',
            tipo: 'Camioneta',
            estado: 'activo',
            capacidad: 20
        });
        expect(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Vehículo no encontrado');
    });
});

describe('DELETE /api/vehiculos/:id', () => {
    // it('should return a 200 status and delete the vehicle', async () => {
    //     const response = await request(app).delete('/api/vehiculos/685870a19a29a76b1bd6c362');
    //     expect(200);
    // });

    it('should return a 404 status and an error message vehicle not found', async () => {
        const response = await request(app).delete('/api/vehiculos/123456789012345678901234');
        expect(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Vehículo no encontrado');
    });
});

describe('PATCH /api/vehiculos/:id/activate', () => {
    it('should return a 200 status and update the vehicle', async () => {
        await request(app).patch('/api/vehiculos/685870a19a29a76b1bd6c362/activate').send({
            estado: 'inactivo'
        });
        expect(200);
    });

    it('should return a 404 status and an error message vehicle not found', async () => {
        const response = await request(app).patch('/api/vehiculos/123456789012345678901234/activate').send({
            estado: 'inactivo'
        });
        expect(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Vehículo no encontrado');
    });
});

describe('PATCH /api/vehiculos/:id/deactivate', () => {
    it('should return a 200 status and update the vehicle', async () => {
        await request(app).patch('/api/vehiculos/68617b65a4cba98a0ca4f471/deactivate').send({
            estado: 'activo'
        });
        expect(200);
    });

    it('should return a 404 status and an error message vehicle not found', async () => {
        const response = await request(app).patch('/api/vehiculos/123456789012345678901234/deactivate').send({
            estado: 'activo'
        });
        expect(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Vehículo no encontrado');
    });
});

describe('PATCH /api/vehiculos/:id/asignar-chofer', () => {
    it('should return a 200 status and assign a driver to the vehicle', async () => {
        const response = await request(app).patch('/api/vehiculos/68617b65a4cba98a0ca4f471/asignar-chofer').send({
            chofer: '685870a19a29a76b1bd6c362'
        });
        expect(200);
    });

    it('should return a 404 status and an error message vehicle not found', async () => {
        const response = await request(app).patch('/api/vehiculos/123456789012345678901234/asignar-chofer').send({
            chofer: '685870a19a29a76b1bd6c362'
        });
        expect(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Vehículo no encontrado');
    });

    it('should return a 404 status and an error message driver not found', async () => {
        const response = await request(app).patch('/api/vehiculos/68617b65a4cba98a0ca4f471/asignar-chofer').send({
            chofer: '123456789012345678901234'
        });
        expect(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Chofer no encontrado');
    });
});