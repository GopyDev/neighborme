import User from './UserObject';
import BootstrapData from '../../shared/BootstrapData';

export default new User(BootstrapData.getJSON('user'));
