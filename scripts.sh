gulp docker:stop --host 172.24.40.25 --username root --password tHYGN27A9cQM --service world-of-rations-ui

gulp publish:source --host 172.24.40.25 --username root --password tHYGN27A9cQM --service world-of-rations-ui

gulp publish:modules --host 172.24.40.25 --username root --password tHYGN27A9cQM --service world-of-rations-ui

gulp publish:dockerfile --host 172.24.40.25 --username root --password tHYGN27A9cQM --service world-of-rations-ui

gulp docker:build --host 172.24.40.25 --username root --password tHYGN27A9cQM --service world-of-rations-ui

gulp docker:start --host 172.24.40.25 --username root --password tHYGN27A9cQM --service world-of-rations-ui


gulp ssh:command --host 172.24.40.25 --username root --password tHYGN27A9cQM --command "sudo apt-get update"
gulp ssh:command --host 172.24.40.25 --username root --password tHYGN27A9cQM --command "curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -"
gulp ssh:command --host 172.24.40.25 --username root --password tHYGN27A9cQM --command "sudo apt-get install -y nodejs"