#!/usr/bin/env node
const axios = require("axios");

const BASE_URL = "http://localhost:9999";
const [,, cmd, ...args] = process.argv;

async function main() {
  try {
    if (cmd === "add") {
      const description = args.join(" ");
      const res = await axios.post(`${BASE_URL}/create`, { description });
      console.log(`Task added successfully`);

    } else if (cmd === "update") {
      const [id, ...textArr] = args;
      const description = textArr.join(" ");
      await axios.put(`${BASE_URL}/update/${id}`, { description });
      console.log(`Task ${id} updated`);

    } else if (cmd === "delete") {
      const [id] = args;
      await axios.delete(`${BASE_URL}/delete/${id}`);
      console.log(`Task ${id} deleted`);

    } else if (cmd === "mark-in-progress") {
      const [id] = args;
      await axios.put(`${BASE_URL}/update-status/${id}?status=in-progress`);
      console.log(`Task ${id} marked as in-progress`);

    } else if (cmd === "mark-done") {
      const [id] = args;
      await axios.put(`${BASE_URL}/update-status/${id}?status=done`);
      console.log(`Task ${id} marked as done`);

    } else if (cmd === "list") {
      const [status] = args;
      const url = status ? `${BASE_URL}?status=${status}` : BASE_URL;
      const res = await axios.get(url);
      console.log(res.data);

    } else {
      console.log("Unknown command");
    }
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

main();