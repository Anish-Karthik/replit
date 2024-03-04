import { Express } from "express";
import { checkSlugInDatabase, copyS3Folder } from "./aws";

export function initHttp(app: Express) {
  app.post("/project", async (req, res) => {
    const { replId, language } = req.body;
    // Hit a database to ensure this slug isn't taken already
    const isSlugTaken = await checkSlugInDatabase(replId);
    if (isSlugTaken) {
      res.status(400).send("Slug already taken");
      return;
    }

    if (!replId) {
      res.status(400).send("Bad request");
      return;
    }

    await copyS3Folder(`base/${language}`, `code/${replId}`);

    res.send("Project created");
  });
}
