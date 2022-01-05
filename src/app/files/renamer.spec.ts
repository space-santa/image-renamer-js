import { parseDateFromString } from './renamer';

for (const testCase of [
  {
    name: 'empty string',
    testString: '',
    expected: 'bad file',
  },
  {
    name: 'bad string',
    testString: '',
    expected: 'bad file',
  },
  {
    name: 'MTGA short hour PM',
    testString: 'MTGA 17_10_2021 1_03_00 PM.png',
    expected: '2021-10-17_13.03.00.png',
  },
  {
    name: 'MTGA short day long hour pm',
    testString: 'MTGA 2_10_2021 11_03_00 pm.png',
    expected: '2021-10-02_23.03.00.png',
  },
  {
    name: 'MTGA short day short hour AM',
    testString: 'MTGA 2_10_2021 1_03_00 AM.png',
    expected: '2021-10-02_01.03.00.png',
  },
  {
    name: 'MTGA short month am',
    testString: 'MTGA 12_1_2021 11_03_00 am.png',
    expected: '2021-01-12_11.03.00.png',
  },
  {
    name: 'MTGA short month 12 pm should be 00',
    testString: 'MTGA 12_1_2021 12_03_00 pm.png',
    expected: '2021-01-12_00.03.00.png',
  },
]) {
  it(testCase['name'], () => {
    const result = parseDateFromString(testCase['testString']);
    expect(result).toEqual(testCase['expected']);
  });
}
