import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Repository } from "typeorm";
import { Course } from "./entities/course.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly cityRepository: Repository<Course>
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    return await this.cityRepository.save(createCourseDto);
  }

  async findActiveCourses() {
    return await this.cityRepository.find({
      where: {
        active: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.cityRepository.findOne({ where: { id: id } });
  }
}
