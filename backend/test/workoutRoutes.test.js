const request = require("supertest");
const server = require("../server");
const pool = require("../db");
const { expect } = require("chai"); // Impor expect dari chai

let token; // Variable untuk menyimpan token autentikasi

describe("Workout Routes", () => {
  before(async () => {
    // Bersihkan database sebelum testing
    await pool.query("DELETE FROM workout");
    await pool.query("DELETE FROM user");

    // Buat user dan dapatkan token autentikasi
    const user = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };

    await request(server).post("/api/users/register").send(user);

    const res = await request(server).post("/api/users/login").send({
      email: "test@example.com",
      password: "password123",
    });

    token = res.body.token; // Simpan token untuk testing workout routes
  });

  after(() => {
    server.close(); // Tutup server setelah testing selesai
  });

  describe("POST /api/workouts", () => {
    it("should create a new workout", async () => {
      const workout = {
        name: "Leg Day",
        exercises: ["squat", "deadlift"],
        day: "Monday",
      };

      const res = await request(server)
        .post("/api/workouts")
        .set("Authorization", `Bearer ${token}`) // Set token di header
        .send(workout);

      expect(res.status).to.equal(201); // Periksa status HTTP
      expect(res.body).to.have.property(
        "message",
        "Workout berhasil ditambahkan"
      );
    });
  });

  describe("GET /api/workouts", () => {
    it("should get all workouts", async () => {
      const res = await request(server)
        .get("/api/workouts")
        .set("Authorization", `Bearer ${token}`); // Set token di header

      expect(res.status).to.equal(200); // Periksa status HTTP
      expect(res.body).to.be.an("array"); // Periksa apakah respons berbentuk array
    });
  });

  describe("DELETE /api/workouts/:id", () => {
    it("should delete a workout", async () => {
      // Ambil ID workout yang ingin dihapus
      const resGet = await request(server)
        .get("/api/workouts")
        .set("Authorization", `Bearer ${token}`);

      const workoutId = resGet.body[0].id; // Asumsikan ada workout di database

      const res = await request(server)
        .delete(`/api/workouts/${workoutId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(200); // Periksa status HTTP
      expect(res.body).to.have.property("message", "Workout berhasil dihapus");
    });
  });
});
