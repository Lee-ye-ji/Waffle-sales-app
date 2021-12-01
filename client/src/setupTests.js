// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// API Mocking 설정
import {server} from './mocks/server';

// 모든 테스트가 시작하기 전에 server를 생성
beforeAll(() => server.listen());
// 하나하나의 테스트 이후에 만든 handler들은 reset 시켜줌
afterEach(() => server.resetHandlers())
// 테스트가 끝나면 그 이후에 서버를 꺼준다는 의미
afterAll(() => server.close())