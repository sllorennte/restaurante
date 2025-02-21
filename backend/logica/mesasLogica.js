const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "restaurante";
const client = new MongoClient(url);

async function obtenerMesas() {
    await client.connect();
    const db = client.db(dbName);
    return await db.collection("mesas").find().toArray();
}

async function reservarMesa(id) {
    await client.connect();
    const db = client.db(dbName);
    const mesa = await db.collection("mesas").findOne({ _id: new ObjectId(id) });

    if (mesa && !mesa.reservada) {
        await db.collection("mesas").updateOne(
            { _id: new ObjectId(id) },
            { $set: { reservada: true } }
        );
        return true;
    }
    return false;
}

module.exports = { obtenerMesas, reservarMesa };
