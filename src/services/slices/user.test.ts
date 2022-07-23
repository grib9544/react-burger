import reducer from './user';

const initState = {
  email: '',
  name: ''
};

describe('userSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initState);
  });

  it('should handle resetUser', () => {
    expect(
      reducer(
        {
          email: 'test@gmail.com',
          name: 'test'
        },
        { type: 'user/resetUser' }
      )
    ).toEqual(initState);
  });
});
