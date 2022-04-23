grade_list = {
    "A+": 4.3, 
    "A0": 4.0,
    "A-": 3.7,
    "B+": 3.3, 
    "B0": 3.0,
    "B-": 2.7,
    "C+": 2.3, 
    "C0": 2.0,
    "C-": 1.7,
    "D+": 1.3, 
    "D0": 1.0,
    "D-": 0.7,
    "F": 0.0,
    "Pass": 4.3,
    "Fail": 0.0
}

names = []
grades_string = []
grades = []
units = []

length = int(input())

for i in range(length):
    (name, grade, unit) = input().split(' ')
    names.append(name)
    grades_string.append(grade)
    grades.append(grade_list[grade])
    units.append(int(unit))

avg_grade = 0
for i in range(length):
    avg_grade += units[i] * grades[i]

avg_grade = avg_grade / sum(units)
avg_grade_string = ''

for k, v in grade_list.items():
    if v > avg_grade: continue
    else:
        avg_grade_string = k
        break

print(f'Average : {avg_grade:.2f} ({avg_grade_string})\n')

retake_index = []

for i in range(length):
    if grades[i] <= 2.69: retake_index.append(i)

print(f'RETAKE NEEDED ({len(retake_index)})')

for i in retake_index:
    print(f' {names[i]} ({grades_string[i]})')

