const express = require('express');
const app = express();
var cors = require('cors')

app.use(cors())

// app.use((req, res, next)=> {
//     if (req.get('authorization') !== '1234') {
//         return res.status(401).json({
//             mensaje: 'Acceso no autorizado'
//         })
//     }
//     next();
// })

app.use(express.json());
app.use(express.urlencoded({'extended':true}));


let facturas = [
    {
        _id: 1,
        razonSocial: 'Iberdrola',
        cif: 'B12345678',
        fecha: '2021-03-05',
        base: 1000,
        tipo: 0.21
    }
]

app.get('/factura', (req, res) => {
    res.status(200).json({
        facturas: facturas
    })
})

app.get('/factura/:_id', (req, res) => {
    let factura = facturas.find((elem) => {
        return elem._id == req.params._id;
    })
    if (factura === undefined) {
        return res.status(204).json({mensaje: 'No se encontró la factura'});
    }
    res.status(200).json({
        factura: factura
    })
})

app.post('/factura', (req, res) => {
    let factura = req.body;
    factura._id = facturas.length + 1;
    facturas.push(factura);
    res.status(200).json({
        mensaje: 'La factura se ha creado correctamente',
        factura: factura
    });
})

app.put('/factura/:_id', (req, res) => {
    let posicion = facturas.findIndex(elem => {
        return elem._id == req.params._id;
    })
    if (posicion < 0) {
        return res.status(204).json({mensaje: 'No existe la factura'});
    } 
    if (req.body.razonSocial !== undefined) {
        facturas[posicion].razonSocial = req.body.razonSocial;
    }
    if (req.body.cif !== undefined) {
        facturas[posicion].cif = req.body.cif;
    }
    if (req.body.fecha !== undefined) {
        facturas[posicion].fecha = req.body.fecha;
    }
    if (req.body.base !== undefined) {
        facturas[posicion].base = req.body.base;
    }
    if (req.body.tipo !== undefined) {
        facturas[posicion].tipo = req.body.tipo;
    }
    res.status(200).json({
        mensaje: 'La factura se actualizó correctamente',
        factura: facturas[posicion]
    })
})

app.delete('/factura/:_id', (req, res) => {
    let posicion = facturas.findIndex(elem => {
        return elem._id == req.params._id;
    })
    if (posicion < 0) {
        return res.status(204).json({mensaje: 'No existe la factura'});
    } 
    facturas.splice(posicion, 1);
    res.status(200).json({
        mensaje: 'La factura se ha eliminado correctamente',
        factura: facturas[posicion]
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${ PORT }`);
});