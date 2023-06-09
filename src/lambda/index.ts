/* eslint-disable import/extensions, import/no-absolute-path */
import {double} from '/opt/nodejs/calc';
/* eslint-disable import/extensions, import/no-absolute-path */
import {number, object, string} from '/opt/nodejs/yup-utils';

// 👇 using yup layer
const schema = object().shape({
  name: string().required(),
  age: number().required(),
});

export async function main() {

  await schema.isValid({name: 'Tom', age: 24});

  return {
    // 👇 using calc layer
    body: JSON.stringify({num: double(15)}),
    statusCode: 200,
  };
}
