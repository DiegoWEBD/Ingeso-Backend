import Teacher from "../../../domain/teacher/Teacher";
import TeacherRepository from "../../../domain/teacher/TeacherRepository";
import AlreadyExistsError from "../../errors/already_exists";

export const makeAddTeacher = (
    teacherRepository: TeacherRepository
) => {

    return async (
        name: string,
        email: string
    ): Promise <Teacher> => {

        const existingTeacher = await teacherRepository.findByEmail(email)

        if(existingTeacher !== null){
            throw new AlreadyExistsError(`El profesor con correo '${email}' ya está registrado.`)
        }

        const newTeacher = new Teacher (name, email)

        await teacherRepository.add(newTeacher)

        return newTeacher

    }
}