import { Student } from "../../../domain/student/Student";
import StudentRepository from "../../../domain/student/StudentRepository";
import AlreadyExistsError from "../../errors/already_exists";

export const makeAddStudent = (
    studentRepository: StudentRepository
) => {
    return async (
        name: string,
        email: string
    ): Promise<Student> => {

        const existingStudent = await studentRepository.findByEmail(email)

        if (existingStudent !== null) {
            throw new AlreadyExistsError(`El estudiante con correo '${email}' ya está registrado.`)
        }

        const newStudent = new Student (name, email)

        await studentRepository.add(newStudent)

        return newStudent
    }

}