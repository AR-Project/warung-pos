export interface IAddStore {
  ownerId: string
  name: string
  address?: string
}

interface IAddStoreEntities extends IAddStore {
  _verifyPayload({ ownerId, name, address }: IAddStore): void
}

export default class AddStore implements IAddStoreEntities {
  ownerId: string
  name: string
  address?: string
  constructor(payload: IAddStore) {
    this._verifyPayload(payload)

    const { ownerId, name, address }: IAddStore = payload

    this.ownerId = ownerId
    this.name = name
    this.address = address ? address : 'n/a'
  }
  _verifyPayload({ ownerId, name }: IAddStore): void {
    if (ownerId == null || name == null) {
      throw new Error('ADD_STORE.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (
      typeof ownerId !== 'string' ||
      typeof name !== 'string'
    ) {
      throw new Error("ADD_STORE.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }


    if (name.length > 50) {
      throw new Error('ADD_STORE.STORE_NAME_LIMIT_CHAR')
    }

    if (name.match(/^[\w' ]+$/) == null) {
      throw new Error("ADD_STORE.NAME_CONTAIN_RESTRICTED_CHARACTER");

    }
  }
}