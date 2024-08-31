import prismaCliente from "../prisma";

interface MeasureRequest {
    measure_type: string
}

class MeasureListService {
    async execute({ measure_type }: MeasureRequest) {

        try {

            const measureAlreadyExists = await prismaCliente.measure.findFirst({
                where: {
                    measure_type: measure_type
                }
            })

            //se não existir
            if (!measureAlreadyExists) {
                const measure = await prismaCliente.measure.findMany({
                    select: {
                        measure_uuid: true,
                        measure_type: true,
                        measure_value: true,
                        measure_datetime: true,
                        image_url: true
                    }
                })

                return measure;
            }

            const measure = await prismaCliente.measure.findMany({
                where: {
                    measure_type: measure_type
                },
                select: {
                    measure_uuid: true,
                    measure_type: true,
                    measure_value: true,
                    measure_datetime: true,
                    image_url: true
                }
            })

            return measure;

        } catch (err) {
            throw new Error("Error ")
        }
    }
}

export { MeasureListService }