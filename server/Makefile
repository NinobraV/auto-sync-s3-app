STAGING_ENV=\
	NODE_ENV=development \
	SERVER_PORT=8080 \
	DB_HOST=od18ec4mxqj27p5.coyj5kqaypwr.us-west-2.rds.amazonaws.com \
	DB_PORT=3306 \
	DB_USER=originsadmin \
	DB_PASSWORD=OrigIns2020 \
	DB_DATABASE=origins \
	REDIS_HOST=localhost \
	REDIS_PORT=6379 \
	REDIS_DB=2 \
	SERVER_LOG_PATH=server-logs \
	JWT_PRIVATE_KEY=psychotherapynetwork \
	JWT_PRIVATE_ADMIN_KEY=adminpsychotherapynetwork \
	JWT_EXPIRES_IN=86400 \
	JWT_REFRESH_KEY=6ScKL9k6hBPLdu2sKgJA \
	ACCESS_KEY_ID=AKIARHMOIDGB5YOGKFHY \
	SECRET_ACCESS_KEY=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 \
	REGION=ap-southeast-1 

build: 
	npm run build

start.dev:
	${STAGING_ENV} \
	npx node dist/apps/api/index.js