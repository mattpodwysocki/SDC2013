$webClient = New-Object System.Net.WebClient
$resp = $webClient.DownloadFile("http://isaacs.iriscouch.com/registry/_all_docs?include_docs=true&update_seq=true", "npm.json");
