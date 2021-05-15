import { v4 as uuidV4 } from 'uuid';
export default class Utils {
    static genRoomId(): string {
        return uuidV4();
    }
}