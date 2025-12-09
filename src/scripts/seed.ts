import prisma from '../lib/prisma';
import cloudinary from '../config/cloudinary';
import path from 'path';
import fs from 'fs';

// Project data to seed
const projects = [
    {
        title: "Application Mobile de Vote Présidentiel",
        description: "Conception et réalisation d'une application mobile sécurisée intégrant blockchain et IA pour garantir l'intégrité du processus électoral.",
        tags: ["React Native", "Blockchain", "IA", "UML", "Smart Contracts", "Node.js"],
        githubUrl: "https://github.com/Ahebiemarc/monpresident_app",
        localImagePath: "images/vote_app/VotingA.png",
        localVideoPath: "videos/vote_app.mp4",
        localScreenshots: [
            "images/vote_app/1.png",
            "images/vote_app/2.png",
            "images/vote_app/3.png",
            "images/vote_app/4.png",
            "images/vote_app/5.png",
            "images/vote_app/6.png",
            "images/vote_app/7.png",
            "images/vote_app/8.png",
            "images/vote_app/9.png",
            "images/vote_app/10.png",
            "images/vote_app/11.png",
            "images/vote_app/12.png",
            "images/vote_app/13.png",
            "images/vote_app/14.png",
        ]
    },
    {
        title: "Application Mobile de Location Immobilière",
        description: "Développement d'une application React Native pour aider les étudiants à trouver des logements à louer en fonction de leur localisation.",
        tags: ["React Native", "Géolocalisation", "Web Sockets", "Node.js", "MongoDB", "Prisma"],
        githubUrl: "https://github.com/Ahebiemarc/monpresident_app",
        // Use placeholder image URL since original is external
        imageUrlDirect: "https://img.freepik.com/vecteurs-libre/recherche-immobiliere-telephone-mobile_23-2148656898.jpg?semt=ais_hybrid&w=740&q=80",
        localScreenshots: [
            "images/shaus/1.png",
            "images/shaus/2.png",
            "images/shaus/3.png",
            "images/shaus/4.png",
            "images/shaus/5.png",
            "images/shaus/6.png",
            "images/shaus/7.png",
            "images/shaus/9.png",
            "images/shaus/10.png",
            "images/shaus/11.png",
            "images/shaus/12.png",
            "images/shaus/13.png",
        ]
    },
    {
        title: "Plateforme Web de Gestion d'Événements",
        description: "Création d'une application web avec React permettant la publication d'événements et l'achat de billets en ligne.",
        tags: ["React", "Gestion d'événements", "Paiement en ligne", "Node.js", "MongoDB", "Tailwind CSS"],
        githubUrl: "https://github.com/Ahebiemarc/event_webApp",
        localImagePath: "images/eventWebApp/1.png",
        localScreenshots: [
            "images/eventWebApp/1.png",
            "images/eventWebApp/2.png",
            "images/eventWebApp/3.png",
            "images/eventWebApp/4.png",
            "images/eventWebApp/5.png",
        ]
    },
    {
        title: "Système de Reconnaissance Faciale",
        description: "Développement d'une solution précise de détection et reconnaissance de visages avec Python, OpenCV et face_recognition.",
        tags: ["Python", "OpenCV", "IA", "Sécurité"],
        githubUrl: "https://github.com/Ahebiemarc/python_auth_by_face",
        localImagePath: "images/Face_recognition/fr.webp",
        localScreenshots: [
            "images/Face_recognition/1.png",
            "images/Face_recognition/2.png",
            "images/Face_recognition/3.png",
            "images/Face_recognition/4.png",
            "images/Face_recognition/5.png",
            "images/Face_recognition/6.png",
            "images/Face_recognition/7.png",
            "images/Face_recognition/9.png",
            "images/Face_recognition/10.png",
        ]
    },
    {
        title: "Modèle Anti-Spoofing",
        description: "Création d'un système d'anti-spoofing avec Python et CUDA pour prévenir les fraudes biométriques et renforcer la sécurité.",
        tags: ["Python", "Deep Learning", "CUDA", "GPU"],
        githubUrl: "https://github.com/Ahebiemarc/antiSpoofing",
        localImagePath: "images/anti_spoofing/1.png"
    },
    {
        title: "Application Mobile Scan2Pay",
        description: "Développement d'une application de paiement par QR code avec React Native, .NET Core et PostgreSQL.",
        tags: ["React Native", ".NET Core", "PostgreSQL", "Paiement", "QR Code", "API REST", "Postman", "Docker"],
        githubUrl: "https://github.com",
        localImagePath: "images/scan2pay/scpay.jpg",
        localScreenshots: [
            "images/scan2pay/1.png",
            "images/scan2pay/2.png",
            "images/scan2pay/3.png",
            "images/scan2pay/4.png",
            "images/scan2pay/5.png",
            "images/scan2pay/6.png",
            "images/scan2pay/7.png",
            "images/scan2pay/8.png",
            "images/scan2pay/9.png",
            "images/scan2pay/10.png",
            "images/scan2pay/11.jpg",
            "images/scan2pay/12.png",
            "images/scan2pay/13.jpg",
            "images/scan2pay/14.jpg",
            "images/scan2pay/15.jpg",
            "images/scan2pay/16.jpg",
            "images/scan2pay/17.jpg",
            "images/scan2pay/18.jpg",
            "images/scan2pay/19.jpg",
        ]
    }
];

// Helper function to upload file to Cloudinary
async function uploadToCloudinary(localPath: string, resourceType: 'image' | 'video' = 'image'): Promise<string> {
    const frontendPublicPath = path.join(__dirname, '../../../mon-portfolio/public', localPath);

    if (!fs.existsSync(frontendPublicPath)) {
        console.warn(`File not found: ${frontendPublicPath}, skipping...`);
        return '';
    }

    try {
        const result = await cloudinary.uploader.upload(frontendPublicPath, {
            folder: 'portfolio-projects',
            resource_type: resourceType,
        });
        console.log(`✓ Uploaded ${localPath}`);
        return result.secure_url;
    } catch (error) {
        console.error(`✗ Error uploading ${localPath}:`, error);
        return '';
    }
}

async function seed() {
    console.log('🌱 Starting database seed...\n');

    for (const project of projects) {
        console.log(`\n📦 Processing: ${project.title}`);

        let imageUrl = '';
        let videoUrl = '';
        let screenshots: string[] = [];

        // Upload main image
        if (project.localImagePath) {
            imageUrl = await uploadToCloudinary(project.localImagePath);
        } else if ((project as any).imageUrlDirect) {
            imageUrl = (project as any).imageUrlDirect;
        }

        // Upload video if exists
        if ((project as any).localVideoPath) {
            videoUrl = await uploadToCloudinary((project as any).localVideoPath, 'video');
        }

        // Upload screenshots
        if (project.localScreenshots) {
            for (const screenshot of project.localScreenshots) {
                const url = await uploadToCloudinary(screenshot);
                if (url) screenshots.push(url);
            }
        }

        // Create project in database
        if (imageUrl) {
            try {
                await prisma.project.create({
                    data: {
                        title: project.title,
                        description: project.description,
                        imageUrl,
                        videoUrl: videoUrl || undefined,
                        screenshots,
                        githubUrl: project.githubUrl,
                        tags: project.tags,
                    },
                });
                console.log(`✓ Created project: ${project.title}`);
            } catch (error) {
                console.error(`✗ Error creating project ${project.title}:`, error);
            }
        } else {
            console.warn(`⚠ Skipping project ${project.title} - no image available`);
        }
    }

    console.log('\n✅ Seed completed!');
}

seed()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
