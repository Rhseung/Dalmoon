import random

testcase = int(input())
sum_each = 0
count = [0] * testcase

for i in range(testcase):
    sum_each = 0

    while sum_each < 1:
        sum_each += random.random()
        count[i] += 1
    print(f'{i:4}try | sum: {sum_each:.16f} | count: {count[i]}')

for i in range(testcase):
    if count.count(i) == 0: continue
    print(f'{i}가 나오는 횟수: {count.count(i)}')