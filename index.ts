import inquirer from "inquirer";
import chalk from "chalk";

let courses: { name: string; fee: number; }[] = [];
let students: { name: string; id: number; balance: number; }[] = [];
let pendingEnrollments: { student: { name: string; id: number; }; pendingFee: number; }[] = [];
let choicesCondition = true;

console.log(chalk.bold.green('\n \t \t        Student Management System        \n'));

while (choicesCondition) {

    let choices = await inquirer.prompt([
        {
            type: 'list',
            name: "choicesMore",
            message: "Which action do you want to implement?",
            choices: ['Courses', 'Students', 'Enrollment', 'Exit']
        }
    ]);

    switch (choices.choicesMore) {
        case 'Courses':
            const validateCourseFee = (value: any) => {
                if (value.trim() !== '' && !isNaN(value)) {
                    return true;
                } else {
                    console.log(chalk.red.bold("\n Please enter a valid number for the fee."));
                    return false;
                }
            };
            console.log(chalk.green("You have selected Courses"));
            let coursesList = await inquirer.prompt([{
                type: 'list',
                name: "coursesChoices",
                message: "What action do you want to perform on Courses?",
                choices: ['AddCourses', 'ViewCourses', 'EditCourses', 'DeleteCourses', 'Exit']
            }]);

            if (coursesList.coursesChoices === 'AddCourses') {
                let condition = true;
                while (condition) {
                    let questionsAddCourse = await inquirer.prompt([
                        {
                            name: "courseName",
                            type: "input",
                            message: "Enter the course name:"
                        },
                        {
                            name: "courseFee",
                            type: "input",
                            message: "Enter the fee of the course:",
                            validate: validateCourseFee
                        }
                    ]);
                    if (!questionsAddCourse.courseName) {
                        console.log(chalk.bold.yellowBright("Empty Course Name!"));
                    } else {
                        courses.push({
                            name: questionsAddCourse.courseName,
                            fee: parseFloat(questionsAddCourse.courseFee)
                        });
                        console.log(chalk.green(`${questionsAddCourse.courseName} added successfully.`));
                        let questionsCoursesConfirmation = await inquirer.prompt([
                            {
                                name: "secondCourseQuestion",
                                type: "confirm",
                                message: "Do you want to add more courses?",
                                default: true
                            }
                        ]);
                        condition = questionsCoursesConfirmation.secondCourseQuestion;
                    }
                }
            } else if (coursesList.coursesChoices === "ViewCourses") {
                if (courses.length === 0) {
                    console.log(chalk.yellow('No courses available.'));
                } else {
                    console.log(chalk.bold.cyanBright("Courses List:"));
                    courses.forEach(course => {
                        console.log(chalk.cyan(`- ${course.name} | Fee: ${course.fee}`));
                    });
                }
            } else if (coursesList.coursesChoices === "EditCourses") {
                if (courses.length === 0) {
                    console.log(chalk.yellow('No courses available to edit.'));
                } else {
                    let editCourseChoice = await inquirer.prompt([
                        {
                            name: 'index',
                            type: 'number',
                            message: 'Enter the index of the course you want to edit:',
                        }
                    ]);
                    const editCourseIndex = editCourseChoice.index - 1;
                    if (editCourseIndex >= 0 && editCourseIndex < courses.length) {
                        let updateCourseInfo = await inquirer.prompt([
                            {
                                name: 'updatedName',
                                type: 'input',
                                message: 'Enter the updated course name:'
                            },
                            {
                                name: 'updatedFee',
                                type: 'input',
                                message: 'Enter the updated fee:',
                                validate: validateCourseFee
                            }
                        ]);
                        courses[editCourseIndex].name = updateCourseInfo.updatedName;
                        courses[editCourseIndex].fee = parseFloat(updateCourseInfo.updatedFee);
                        console.log(chalk.bgGreenBright.bold('\n \t Course Updated Successfully.\n'));
                    } else {
                        console.log(chalk.red.bold('Invalid index or course does not exist.'));
                    }
                }
            } else if (coursesList.coursesChoices === "DeleteCourses") {
                if (courses.length === 0) {
                    console.log(chalk.yellow('No courses available to delete.'));
                } else {
                    let deleteCourseChoice = await inquirer.prompt([
                        {
                            name: 'index',
                            type: 'number',
                            message: 'Enter the index of the course you want to delete:',
                        }
                    ]);
                    const deleteCourseIndex = deleteCourseChoice.index - 1;
                    if (deleteCourseIndex >= 0 && deleteCourseIndex < courses.length) {
                        courses.splice(deleteCourseIndex, 1);
                        console.log(chalk.bgRedBright.bold('\n \t Course Deleted Successfully.\n'));
                    } else {
                        console.log(chalk.red.bold('Invalid index or course does not exist.'));
                    }
                }
            }
            else if (coursesList.coursesChoices === 'Exit') {
                console.log(chalk.yellow('Exiting...'));
                choicesCondition = false;
            }
            break;

            case 'Students':
                console.log(chalk.green("You have selected Students"));
            
                let studentList = await inquirer.prompt([{
                    type: 'list',
                    name: "studentChoices",
                    message: "What action do you want to perform on Student Section?",
                    choices: ['AddStudent', 'ViewStudent', 'EditStudent', 'DeleteStudent','Exit']
                }]);
            
                if (studentList.studentChoices === 'AddStudent') {
                    let condition = true;
                    while (condition) {
                        let questionsAddStudent = await inquirer.prompt([
                            {
                                name: "studentName",
                                type: "input",
                                message: "Enter the student name:",
                                validate: (value) => {
                                    if (value.trim() !== '') {
                                        return true;
                                    } else {
                                        console.log(chalk.red.bold("\n Student name cannot be empty!"));
                                        return false;
                                    }
                                }
                            }
                        ]);
                        if (!questionsAddStudent.studentName) {
                            console.log(chalk.bold.yellowBright("Empty name is not allowed!"));
                        } else {
                            let studentID = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
                            let studentBalance = 200000; // Initialize balance to 200000
                            students.push({
                                name: questionsAddStudent.studentName,
                                id: studentID,
                                balance: studentBalance
                            });
            
                            console.log(chalk.green(`${questionsAddStudent.studentName} with ID ${studentID} added successfully.`));
                            let questionsStudentConfirmation = await inquirer.prompt([
                                {
                                    name: "addMore",
                                    type: "confirm",
                                    message: "Do you want to add more students?",
                                    default: true
                                }
                            ]);
                            condition = questionsStudentConfirmation.addMore;
                        }
                    }
                } else if (studentList.studentChoices === "ViewStudent") {
                    if (students.length === 0) {
                        console.log(chalk.yellow('No students available.'));
                    } else {
                        console.log(chalk.bold.cyanBright("Students List:"));
                        students.forEach(student => {
                            console.log(chalk.cyan(`- Name: ${student.name}, ID: ${student.id}`));
                        });
                    }
                } else if (studentList.studentChoices === "EditStudent") {
                    if (students.length === 0) {
                        console.log(chalk.yellow('No students available to edit.'));
                    } else {
                        let editStudentChoice = await inquirer.prompt([
                            {
                                name: 'index',
                                type: 'number',
                                message: 'Enter the index of the student you want to edit:',
                            }
                        ]);
                        const editStudentIndex = editStudentChoice.index - 1;
                        if (editStudentIndex >= 0 && editStudentIndex < students.length) {
                            let updateStudentInfo = await inquirer.prompt([
                                {
                                    name: 'updatedName',
                                    type: 'input',
                                    message: 'Enter the updated student name:'
                                }
                            ]);
                            students[editStudentIndex].name = updateStudentInfo.updatedName;
                            console.log(chalk.bgGreenBright.bold('\n \t Student Updated Successfully.\n'));
                        } else {
                            console.log(chalk.red.bold('Invalid index or student does not exist.'));
                        }
                    }
                } else if (studentList.studentChoices === "DeleteStudent") {
                    if (students.length === 0) {
                        console.log(chalk.yellow('No students available to delete.'));
                    } else {
                        let deleteStudentChoice = await inquirer.prompt([
                            {
                                name: 'index',
                                type: 'number',
                                message: 'Enter the index of the student you want to delete:',
                            }
                        ]);
                        const deleteStudentIndex = deleteStudentChoice.index - 1;
                        if (deleteStudentIndex >= 0 && deleteStudentIndex < students.length) {
                            students.splice(deleteStudentIndex, 1);
                            console.log(chalk.bgRedBright.bold('\n \t Student Deleted Successfully.\n'));
                        } else {
                            console.log(chalk.red.bold('Invalid index or student does not exist.'));
                        }
                    }
                }
                else if (studentList.studentChoices === 'Exit') {
                    console.log(chalk.yellow('Exiting...'));
                    choicesCondition = false;
                }
            break;
            
            case 'Enrollment':
                console.log(chalk.green("You have selected Enrollment"));
            
                let enrollmentChoice = await inquirer.prompt([
                    {
                        type: 'list',
                        name: "enrollmentAction",
                        message: "What action do you want to perform for Enrollment?",
                        choices: ['EnrollStudent', 'ViewPendingStudents', 'PayPendingFee', 'ViewBalance', 'Exit']
                    }
                ]);
            
                if (enrollmentChoice.enrollmentAction === 'EnrollStudent') {
                    if (courses.length === 0 || students.length === 0) {
                        console.log(chalk.yellow('No courses or students available for enrollment.'));
                    } else {
                        let enrollmentDetails = await inquirer.prompt([
                            {
                                name: 'studentName',
                                type: 'list',
                                message: 'Select the student to enroll:',
                                choices: students.map(student => student.name)
                            },
                            {
                                name: 'courseName',
                                type: 'list',
                                message: 'Select the course to enroll in:',
                                choices: courses.map(course => course.name)
                            },
                            {
                                name: 'payNow',
                                type: 'confirm',
                                message: 'Do you want to pay the tuition fee now?',
                                default: true
                            }
                        ]);
            
                        const student = students.find(student => student.name === enrollmentDetails.studentName);
                        const course = courses.find(course => course.name === enrollmentDetails.courseName);
            
                        if (student && course) {
                            if (enrollmentDetails.payNow) {
                                if (student.balance >= course.fee) {
                                    student.balance -= course.fee;
                                    console.log(chalk.green(`Student ID: ${student.id} - ${student.name} successfully enrolled in ${course.name}. Course fee of ${course.fee} deducted from the balance.`));
                                    console.log(chalk.green(`Updated Balance is: ${student.balance}`));
                                    console.log(chalk.green('Fee status: Cleared'));
                                } else {
                                    console.log(chalk.red(`${student.name} does not have sufficient balance to pay the course fee.`));
                                    console.log(chalk.red('Fee status: Pending'));
                                }
                            } else {
                                const pendingEnrollment = {
                                    student: student,
                                    course: course,
                                    pendingFee: course.fee
                                };
                                pendingEnrollments.push(pendingEnrollment);
                                console.log(`${student.name} enrolled in ${course.name}. Pending fees: ${course.fee}`);
                                console.log(`Student ID: ${student.id}`);
                                console.log(chalk.red('Fee status: Pending'));
                            }
                        
                            // const investedAmount = 200000 - student.balance;
                            // const duesStatus = enrollmentDetails.payNow ? (investedAmount === 0 ? chalk.green('Cleared') : chalk.red('Pending')) : chalk.red('Pending');
                            // console.log(`Remaining Dues: ${investedAmount}, Dues Status: ${duesStatus}`);
                        } else {
                            console.log(chalk.red('Invalid student or course selected.'));
                        }
                        
                    }
                } else if (enrollmentChoice.enrollmentAction === 'PayPendingFee') {
                    if (pendingEnrollments.length === 0) {
                        console.log(chalk.yellow('No pending fees to pay.'));
                    } else {
                        console.log(chalk.bold.cyanBright("Students with Pending Fees:"));
                        let pendingStudentChoices = pendingEnrollments.map((enrollment, index) => ({
                            name: `${enrollment.student.name} | Pending Fee: ${enrollment.pendingFee}`,
                            value: index
                        }));
            
                        let selectedEnrollmentIndex = await inquirer.prompt([
                            {
                                name: 'selectedEnrollment',
                                type: 'list',
                                message: 'Select the student to pay pending fee:',
                                choices: pendingStudentChoices
                            }
                        ]);
            
                        let selectedEnrollment = pendingEnrollments[selectedEnrollmentIndex.selectedEnrollment];
                        let student = selectedEnrollment.student;
                        let pendingFee = selectedEnrollment.pendingFee;
            
                        let paymentConfirmation = await inquirer.prompt([
                            {
                                name: 'confirmPayment',
                                type: 'confirm',
                                message: `Are you sure you want to pay ${pendingFee} for ${student.name}?`,
                                default: false
                            }
                        ]);
            
                        if (paymentConfirmation.confirmPayment) {
                            let selectedStudent = students.find(s => s.id === student.id);
            
                            if (selectedStudent && selectedStudent.balance >= pendingFee) {
                                selectedStudent.balance -= pendingFee;
                                console.log(chalk.green(`Payment successful! ${selectedStudent.name}'s pending fee of ${pendingFee} has been cleared.`));
                                pendingEnrollments.splice(selectedEnrollmentIndex.selectedEnrollment, 1);
                            } else {
                                console.log(chalk.red('Insufficient balance to pay the pending fee.'));
                            }
                        } else {
                            console.log(chalk.yellow('Payment cancelled.'));
                        }
                    }
                } else if (enrollmentChoice.enrollmentAction === 'ViewPendingStudents') {
                    if (pendingEnrollments.length === 0) {
                        console.log(chalk.yellow('No students have pending fees.'));
                    } else {
                        console.log(chalk.bold.cyanBright("Students with Pending Fees:"));
                        pendingEnrollments.forEach(enrollment => {
                            console.log(`- Name: ${enrollment.student.name}, ID: ${enrollment.student.id}, Pending Fee: ${enrollment.pendingFee}`);
                        });
                    }
                   }   else if (enrollmentChoice.enrollmentAction === "ViewBalance") {
                    if (students.length === 0) {
                        console.log(chalk.yellow('No students available.'));
                    } else {
                        console.log(chalk.bold.cyanBright("Students and Their Dues Status:"));
                        students.forEach(student => {
                            // Check if the student has any pending enrollments
                            const hasPendingEnrollment = pendingEnrollments.some(enrollment => enrollment.student.id === student.id);
                            if (hasPendingEnrollment) {
                                console.log(`- Name: ${student.name}, ID: ${student.id}, Balance: ${student.balance}, Dues Status: Pending, Invested Amount: 0`);
                            } else {
                                // Recalculate dues status based on the current balance
                                let investedAmount = 200000 - student.balance;
                                let duesStatus = investedAmount === 0 ? chalk.red('Pending') : chalk.green('Cleared');
                                console.log(`- Name: ${student.name}, ID: ${student.id}, Balance: ${student.balance}, Dues Status: ${duesStatus}, Invested Amount: ${investedAmount}`);
                            }
                        });
                    }
                }
                
                     else if (enrollmentChoice.enrollmentAction === 'Exit') {
                    console.log(chalk.yellow('Exiting...'));
                    choicesCondition = false;
                }
            break;
            
        case 'Exit':
            console.log(chalk.yellow('Exited'));
            choicesCondition = false;
            break;

        default:
            console.log(chalk.red("Invalid option selected."));
            break;
    }
}
