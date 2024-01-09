export function getSelectedRole(): {
  id: number;
  role_id: number;
  label: string;
  logo_administration: any;
  name: string;
  name_administration: any;
  name_aggregator: any;
} | null {
  let localStorageMenu = localStorage.getItem('menu');
  if (localStorageMenu) {
    let data = JSON.parse(localStorageMenu);
    if (data.selectdRole) {
      return data.selectdRole;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
