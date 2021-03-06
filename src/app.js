const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(p => p.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({
      message: "Repository not found!"
    });
  }

  const { url, title, techs } = request.body;

  repositories[repositoryIndex] = {
    id,
    url,
    title,
    techs,
    likes: repositories[repositoryIndex].likes
  }

  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(p => p.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({
      message: "Repository not found!"
    })
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(p => p.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({
      message: "Repository not found!"
    });
  }

  repositories[repositoryIndex].likes += 1;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
