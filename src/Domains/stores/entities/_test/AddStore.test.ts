import AddStore, { IAddStore } from '../AddStore.js'

describe('a AddStore entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      ownerId: 'user-123',
    }
    // @ts-expect-error testing error
    expect(() => new AddStore(payload)).toThrowError('ADD_STORE.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      ownerId: 123,
      name: ['name'],
      address: true
    }
    const payload2 = {
      ownerId: 'user-123',
      name: ['name'],
      address: true
    }

    // Action and assert
    // @ts-expect-error testing for error
    expect(() => new AddStore(payload)).toThrowError('ADD_STORE.NOT_MEET_DATA_TYPE_SPECIFICATION')
    // @ts-expect-error testing for error
    expect(() => new AddStore(payload2)).toThrowError('ADD_STORE.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should throw error when name contains retricted character', () => {
    // Arrange
    const payload = {
      ownerId: 'user-123',
      name: 'Store Name %^'
    }
    expect(() => new AddStore(payload)).toThrowError('ADD_STORE.NAME_CONTAIN_RESTRICTED_CHARACTER')
  })

  it('should throw error when name more than 50 character', () => {
    // Arrange
    const payload = {
      ownerId: 'user-123',
      name: 'Store nameStore nameStore nameStore nameStore nameS'
    }
    expect(() => new AddStore(payload)).toThrowError('ADD_STORE.STORE_NAME_LIMIT_CHAR')
  })

  it('should create addStore object correctly without address payload', () => {
    // Arrange 
    const payload: IAddStore = {
      ownerId: 'user-123',
      name: "User's Store"
    }

    const { ownerId, name, address } = new AddStore(payload)

    // Assert 
    expect(ownerId).toEqual(payload.ownerId)
    expect(name).toEqual(payload.name)
    expect(address).toBe('n/a')
  })

  it('should create addStore object correctly with address payload', () => {
    // Arrange 
    const payload: IAddStore = {
      ownerId: 'user-123',
      name: "User's Store",
      address: 'Street Name No.31, Jakarta, Indonesia - 10000'
    }

    const { ownerId, name, address } = new AddStore(payload)

    // Assert 
    expect(ownerId).toEqual(payload.ownerId)
    expect(name).toEqual(payload.name)
    expect(address).toEqual(payload.address)
  })
})