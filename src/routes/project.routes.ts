import { Router } from 'express';
import { getProjects, createProject } from '../controllers/project.controller';
import upload from '../middleware/upload';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getProjects);
router.post('/', authMiddleware, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'screenshots', maxCount: 10 }
]), createProject);

export default router;
