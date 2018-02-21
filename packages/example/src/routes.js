import { Router } from 'express';

const router = new Router();

const func = rt => rt + 'Changed';

router.route('/').get(async (req, res) => {
  const response = await Promise.resolve('Server Working Fine');
  console.log(func(57)); // eslint-disable-line
  res.json(response);
});

export default router;
