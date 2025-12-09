import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching projects' });
    }
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const { title, description, link, githubUrl, tags } = req.body;

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const imageUrl = files['image']?.[0]?.path;
        const videoUrl = files['video']?.[0]?.path;
        const screenshots = files['screenshots']?.map(file => file.path) || [];

        if (!imageUrl) {
            return res.status(400).json({ error: 'Image is required' });
        }

        const project = await prisma.project.create({
            data: {
                title,
                description,
                imageUrl,
                videoUrl,
                screenshots,
                link,
                githubUrl,
                tags: tags ? JSON.parse(tags) : [],
            },
        });

        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating project' });
    }
};
