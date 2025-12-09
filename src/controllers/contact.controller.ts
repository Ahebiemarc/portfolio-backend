import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const submitContact = async (req: Request, res: Response) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });

        res.status(201).json({
            message: 'Message sent successfully!',
            contact
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error submitting contact form' });
    }
};

export const getContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await prisma.contact.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching contacts' });
    }
};
