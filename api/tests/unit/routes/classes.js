const Helper = require('../../helper')

describe('routes/classes', () => {
  test('should list', async () => {
    const { data } = await Helper.apiGet('/classes')

    expect(data).toStrictEqual(expect.any(Array))
    expect(data.length > 0).toBeTruthy()
  })
})
