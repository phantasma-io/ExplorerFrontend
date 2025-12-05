<div align="center">

# Explorer Frontend
</div>

## Installation with docker

### User

Create user 'pha'. All following steps will be using this user and home directory '/home/pha'.

### Docker

Install Docker according to the following instruction: https://docs.docker.com/engine/install/

Create folder for containers:
```
mkdir /home/pha/docker
```

### Frontend

Create following folder:
```
mkdir -p /home/pha/docker/explorer-frontend
```

Copy content of ExplorerFrontend/docker folder into /home/pha/docker/explorer-frontend.

Add file /home/pha/docker/explorer-frontend/.env with the following content:
```
# Github branch to be used
BUILD_BRANCH=main
```
where 'main' is main github branch of backend project which we use for production deployment.

Launch frontend service from folder /home/pha/docker/explorer-frontend by either using sh script 'deploy.sh'
```
deploy.sh
```
or by running commands
```
docker compose pull
docker compose up -d
```

### Nginx

Switch to 'root' user or use sudo.

Install Nginx package.

Place list of Cloudflare IP addresses into this file:

/etc/nginx/cloudflare-allow.conf

Content for this file can be obtained here: https://www.cloudflare.com/ips

Set these rights:
```
chmod 644 /etc/nginx/cloudflare-allow.conf
```

Place phantasma.info certificate and certificate key into following locations:

/etc/ssl/certs/cf-phantasma.info.pem

/etc/ssl/private/cf-phantasma.info.key

Set rights for these files

```
chmod 644 /etc/ssl/certs/cf-phantasma.info.pem
chmod 600 /etc/ssl/private/cf-phantasma.info.key
```

Add following file:
```
/etc/nginx/sites-available/explorer.phantasma.info
```

with the following content:
```
server {
    listen        443 ssl;

    include /etc/nginx/cloudflare-allow.conf;
    deny all;

    server_name explorer.phantasma.info;
    ssl_certificate     /etc/ssl/certs/cf-phantasma.info.pem;
    ssl_certificate_key /etc/ssl/private/cf-phantasma.info.key;
    location / {
        proxy_pass http://127.0.0.1:4500;
        # https://nginx.org/en/docs/http/websocket.html
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Set these rights:
```
chmod 644 /etc/nginx/sites-available/explorer.phantasma.info
```

Create link with the following command:
```
ln -s /etc/nginx/sites-available/explorer.phantasma.info /etc/nginx/sites-enabled/explorer.phantasma.info
```

Test Nginx configuration using command:
```
sudo nginx -t
```

Restart Nginx to apply changes:
```
sudo /etc/init.d/nginx restart
```

### Test frontend

To test if deployment was successful, following url can be used:

https://explorer.phantasma.info/


## Installation without docker

Node.js 24.x with npm (see `.nvmrc`) is required for local development and builds.

### <b>Requirements</b>

<b>Baseline:</b>

- Display chains
- Display addresses
- Display blocks
- Display transactions
- Display contracts
- Display tokens
- Display DAOs
- Search
- Export CSV

<b>Extra spice:</b>

- Refreshed design
- Mobile friendly
- Dark mode
- White label
- Localization
- Data visualization
- Component library with `storybook`
- Unit tests with `jest` and `react-testing-library`
- Integration / e2e tests with `cypress`
- CI workflows with `github-actions`
- CD workflows with `vercel`
- Auto generated changelogs on release

<br />

</div>

### <b>Scripts</b>

```tsx
// install deps
npm install

// run dev server
npm run dev

// build app
npm run build

// start app
npm start

// export app
npm run export

// run lint
npm run lint

// run unit tests
npm test

// run e2e tests
npm run cy:run

// run storybook
npm run sb
```

<br />

### <b>Dev Dependencies</b>

- `npm`
- `Typescript`
- `React`
- `Material-UI`
- `Next`
- `Prettier`
- `ESLint`
- `Commit Lint`
- `Lint Staged`
- `Husky`
- `Jest`
- `React Testing Library`
- `Cypress`
- `Storybook`
- `Webpack`
- `Semantic Release`

<br />
