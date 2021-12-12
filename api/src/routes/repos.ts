import { Router, Request, Response } from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.header('Content-Type', 'application/json');

  const fetchDataFromFile = fs.promises.readFile(
    path.resolve(__dirname, '../../../api/data/repos.json')
  );

  const fetchDataFromUrl = axios.get(
    'https://api.github.com/users/silverorange/repos'
  );

  let repos = await Promise.all([fetchDataFromFile, fetchDataFromUrl])
    .then((data) => {
      let res1 = JSON.parse(data[0].toString());
      let res2 = data[1].data;

      // Only return repositories where repository.fork is false
      return res1.concat(res2).filter((repo: any) => repo.fork === false);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Error Aggregating Data from sources');
    });

  res.status(200).json(repos);
});
