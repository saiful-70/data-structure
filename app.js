// transforming the data
const transform = (data) => {
  const students = data.students;
  const studentBookProficiency = data.student_book_proficiency;

  return students.map((student) => {
    return {
      student_id: student.student_id,
      student_name: student.student_name,
      img: student.img,
      data: studentBookProficiency.map((monthData) => {
        return {
          month: monthData.month,
          readings: monthData.data.map((bookData) => {
            const studentData = bookData.student_data.find(
              (sd) => sd.student_id === student.student_id
            );
            return {
              book_id: bookData.book_id,
              book_name: bookData.book_name,
              proficiency: studentData ? studentData.proficiency : 0,
            };
          }),
        };
      }),
    };
  });
};

fetch("data.json") //fetching data from external data.json file
  .then((response) => response.json())
  .then((data) => {
    const transformedData = transform(data);
    console.log(transformedData); //logging the transformed data into browser console
  });
