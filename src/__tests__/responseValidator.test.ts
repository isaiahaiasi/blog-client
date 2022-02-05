import { expect } from 'chai';
import validateResponse from '../utils/responseValidator';

describe('validateResponse() (validates API responses)', () => {
  const expectRes = (res: any, fields: string[] = []) =>
    expect(validateResponse(res, fields));

  it('Returns false if response is null or undefined', () => {
    expectRes(null).to.be.false;
    expectRes(undefined).to.be.false;
  });

  it("Returns false if response isn't an object", () => {
    expectRes('string').to.be.false;
    expectRes(123).to.be.false;
  });

  it("Returns false if response.body isn't an object", () => {
    expectRes({ body: 'string' }).to.be.false;
    expectRes({ body: 123 }).to.be.false;
  });

  it("Returns false if response.body.content isn't an object or is null", () => {
    expectRes({ body: { content: 123 } }).to.be.false;
    expectRes({ body: { content: 'awefaef' } }).to.be.false;
    expectRes({ body: { content: 'awefaef' } }).to.be.false;
    expectRes({ body: { content: null } }, ['field']).to.be.false;
  });

  it('returns false if response.body.content is missing any given properties', () => {
    expectRes({ body: { content: 123 } }).to.be.false;
  });

  xit('Returns true if all given properties exist on response.body.content', () => {
    const res = {
      body: {
        content: {
          username: 'test',
          _id: 'blah',
        },
      },
    };

    expectRes(res, ['username', '_id']).to.be.true;
  });
});
