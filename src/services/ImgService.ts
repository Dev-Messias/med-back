
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prismaCliente from "../prisma";

import dotenv from 'dotenv';
dotenv.config();

// Função para enviar a imagem para a API do Google Gemini e extrair o valor
export async function ImgService(imagePath: string, measure_type: string) {
    const fileManager = new GoogleAIFileManager(`${process.env.GEMINI_API_KEY}`);

    const uploadResult = await fileManager.uploadFile(
        `${imagePath}`,
        {
            mimeType: "image/jpeg",
            displayName: "Jetpack drawing",
        },
    );

    const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
        "return only the reading numbers",
        {
            fileData: {
                fileUri: uploadResult.file.uri,
                mimeType: uploadResult.file.mimeType,
            },
        },
    ]);
    // console.log(result.response.text());

    const text = result.response.text()
    const value = +text //passando para int
    // const apenasNumeros = text.replace(/\D/g, "")

    const measure = await prismaCliente.measure.create({
        data: {
            image_url: imagePath,
            measure_value: value,
            measure_type: measure_type.toLowerCase()
        },
        select:{
            measure_uuid: true,
            image_url: true,
            measure_value: true,
            measure_type: true,
            measure_datetime: true
        }
    })

    return measure
}

