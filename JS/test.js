const urlExcel = document.querySelector(`.urlExcel`);
const testBtn = document.querySelector(`.testBtn`);
const showTest = document.querySelector(`.test`);

testBtn.onclick = (e) => {
    const excels = urlExcel.trim().split(`\n`);

    let UPCsInnerText = ``;
    let URLsInnerText = ``;

    let l = excels.length;
    for (let i = 0; i < l; i++) {
        const temp = excels[i].split(`\t`);
        if (!temp[0]) break;

        let tempText = ``;
        for (let j = 8; j < 14; j++) {
            if (temp[j] !== ``)
                tempText += `${j === 8 ? `` : `,`}"${temp[j].trim()}"`;
        }

        UPCsInnerText += `${i === 0 ? `` : `,`}"${temp[1]}"`;
        URLsInnerText += `${i === 0 ? `` : `,`}@(${tempText} )`;
    }

    URLsInnerText = `$URLs = @(${URLsInnerText}) ;`;
    UPCsInnerText = `$UPCs = @(${UPCsInnerText}) ;`;

    showTest.textContent = `${URLsInnerText} ${UPCsInnerText} $client = [System.Net.Http.HttpClient]::new() ;$path = $PWD.Path;Write-Host "Downloading , Pls wait a moment ... <3" ;for ($i = 0; $i -lt $URLs.Length; $i++) { for ($j = 0; $j -lt $URLs[$i].Length; $j++) { $cleanUrl = $URLs[$i][$j].Trim(); $prefix = $UPCs[$i]; if ($j -eq 0) { $name = "$prefix-hero"; } else { $name = "$prefix-$j"; } $file = "$path/$name.jpg"; if (Test-Path $file) { Write-Host "Skip $name" ; continue ; } try { $bytes = $client.GetByteArrayAsync($cleanUrl).Result ; [System.IO.File]::WriteAllBytes($file, $bytes) ; } catch { Write-Host "Error: $cleanUrl" ; } }}Write-Host "ALL DONE!";`;


};



// $client = [System.Net.Http.HttpClient]::new() ;
// $path = $PWD.Path;
// Write-Host "Downloading , Pls wait a moment ... <3" ;
// for ($i = 0; $i -lt $URLs.Length; $i++) {
//     for ($j = 0; $j -lt $URLs[$i].Length; $j++) {
//         $cleanUrl = $URLs[$i][$j].Trim();
//         $prefix = $UPCs[$i];
//         if ($j -eq 0) {
//             $name = "$prefix-hero";
//         } else {
//             $name = "$prefix-$j";
//         }
//         $file = "$path/$name.jpg";
//         if (Test-Path $file) {
//             Write-Host "Skip $name" ;
//             continue ;
//         }
//         try {
//             $bytes = $client.GetByteArrayAsync($cleanUrl).Result ;
//             [System.IO.File]::WriteAllBytes($file, $bytes) ;
//         }
//         catch {
//             Write-Host "Error: $cleanUrl" ;
//         }
//     }
// }
// Write-Host "ALL DONE!";
