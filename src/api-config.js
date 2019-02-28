let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'nureview.demifili.com') {
  backendHost = 'https://nureview.demifili.com:3000';
} else if (hostname === 'localhost') {
  backendHost = `http://${hostname}:3000`;
} else {
  backendHost = `http://${hostname}:3000`;
}

export const API_ROOT = `${backendHost}`;
