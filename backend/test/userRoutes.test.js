const request = require("supertest");
const server = require("../server"); // Path ke server.js Anda
const pool = require("../db"); // Path ke koneksi database
const { expect } = require("chai"); // Impor expect dari chai

describe("User Routes", () => {
  before(async () => {
    // Bersihkan database sebelum tes
    await pool.query("DELETE FROM user");
  });

  after(() => {
    server.close(); // Tutup server setelah tes selesai
  });

  describe("POST /api/users/register", () => {
    it("should register a new user", async () => {
      const user = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      const res = await request(server).post("/api/users/register").send(user);

      expect(res.status).to.equal(201); // Gunakan expect dari chai
      expect(res.body).to.have.property("message", "Registrasi berhasil");
    });
  });

  describe("POST /api/users/login", () => {
    it("should log in a user and return a token", async () => {
      const user = {
        email: "test@example.com",
        password: "password123",
      };

      const res = await request(server).post("/api/users/login").send(user);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
    });
  });
});
