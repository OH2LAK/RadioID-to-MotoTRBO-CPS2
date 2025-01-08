document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('download-btn').addEventListener('click', function() {
        const messageContainer = document.getElementById('message-container');
        messageContainer.innerHTML = ''; // Clear previous messages
        
        const downloadURL = 'https://radioid.net/static/user.csv';
        const mccInput = document.getElementById('mccInput').value.trim();
        
        if (!mccInput.match(/^1$|^\d{3}$/)) {
            messageContainer.innerHTML = `
                <div class="message error">
                    Error: Please enter a valid 3-digit MCC code
                </div>`;
            return;
        }
        
        const mcc = mccInput.match(/^1$|^\d{3}$/) ? mccInput : '244';

        fetch(downloadURL)
            .then(response => response.text())
            .then(text => {
                const rows = text.split('\n');
                const headers = rows[0].split(',');

                const idIndex = headers.indexOf('RADIO_ID');
                const callIndex = headers.indexOf('CALLSIGN');
                const firstNameIndex = headers.indexOf('FIRST_NAME');
                
                const processedRows = rows
                    .slice(1)
                    .map(row => row.split(','))
                    .filter(cols => cols[idIndex].startsWith(mcc))
                    .map(cols => [
                        `${cols[callIndex]} ${cols[firstNameIndex]}`,  // ContactName
                        'False',                                      // Delete_Contact
                        '',                                           // Rename_Contact
                        '',                                           // Comments
                        'False',                                      // Delete_FiveToneCalls
                        '',                                           // FiveToneCalls-S5CLDLL_5TTELEGRAM
                        '',                                           // FiveToneCalls-S5CLDLL_5TCALLADD
                        'False',                                      // Delete_MDCCalls
                        '',                                           // MDCCalls-AU_CALLLSTID
                        '',                                           // MDCCalls-AU_MDCSYS
                        '',                                           // MDCCalls-AU_RVRTPERS_Zone
                        '',                                           // MDCCalls-AU_RVRTPERS
                        '',                                           // MDCCalls-AU_SPTPLDPL
                        '',                                           // MDCCalls-AU_CALLTYPE
                        'False',                                      // Delete_QuikCallIICalls
                        '',                                           // QuikCallIICalls-QU_QCIISYS
                        '',                                           // QuikCallIICalls-QU_RVRTPERS_Zone
                        '',                                           // QuikCallIICalls-QU_RVRTPERS
                        '',                                           // QuikCallIICalls-QU_CALLFORMAT
                        '',                                           // QuikCallIICalls-QU_TONEATXFRE
                        '',                                           // QuikCallIICalls-QU_CODEA
                        '',                                           // QuikCallIICalls-QU_TONEBTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEB
                        '',                                           // QuikCallIICalls-QU_TONECTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEC
                        '',                                           // QuikCallIICalls-QU_TONEDTXFRE
                        '',                                           // QuikCallIICalls-QU_CODED
                        '',                                           // QuikCallIICalls-QU_TONEETXFRE
                        '',                                           // QuikCallIICalls-QU_CODEE
                        '',                                           // QuikCallIICalls-QU_TONEFTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEF
                        '',                                           // QuikCallIICalls-QU_TONEGTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEG
                        '',                                           // QuikCallIICalls-QU_TONEHTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEH
                        '',                                           // QuikCallIICalls-QU_TONEITXFRE
                        '',                                           // QuikCallIICalls-QU_CODEI
                        '',                                           // QuikCallIICalls-QU_TONEJTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEJ
                        '',                                           // QuikCallIICalls-QU_TONEKTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEK
                        '',                                           // QuikCallIICalls-QU_TONELTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEL
                        '',                                           // QuikCallIICalls-QU_TONEMTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEM
                        '',                                           // QuikCallIICalls-QU_TONENTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEN
                        '',                                           // QuikCallIICalls-QU_TONEOTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEO
                        '',                                           // QuikCallIICalls-QU_TONEPTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEP
                        '',                                           // QuikCallIICalls-QU_TONEQTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEQ
                        '',                                           // QuikCallIICalls-QU_TONERTXFRE
                        '',                                           // QuikCallIICalls-QU_CODER
                        '',                                           // QuikCallIICalls-QU_TONES_TXFRE
                        '',                                           // QuikCallIICalls-QU_CODES
                        '',                                           // QuikCallIICalls-QU_TONETTXFRE
                        '',                                           // QuikCallIICalls-QU_CODET
                        '',                                           // QuikCallIICalls-QU_TONEUTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEU
                        '',                                           // QuikCallIICalls-QU_TONEVTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEV
                        '',                                           // QuikCallIICalls-QU_TONEWTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEW
                        '',                                           // QuikCallIICalls-QU_TONEXTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEX
                        '',                                           // QuikCallIICalls-QU_TONEYTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEY
                        '',                                           // QuikCallIICalls-QU_TONEZTXFRE
                        '',                                           // QuikCallIICalls-QU_CODEZ
                        '',                                           // QuikCallIICalls-QU_TONE1TXFRE
                        '',                                           // QuikCallIICalls-QU_CODE1
                        '',                                           // QuikCallIICalls-QU_TONE2TXFRE
                        '',                                           // QuikCallIICalls-QU_CODE2
                        '',                                           // QuikCallIICalls-QU_TONE3TXFRE
                        '',                                           // QuikCallIICalls-QU_CODE3
                        '',                                           // QuikCallIICalls-QU_TONE4TXFRE
                        '',                                           // QuikCallIICalls-QU_CODE4
                        '',                                           // QuikCallIICalls-QU_TONE5TXFRE
                        '',                                           // QuikCallIICalls-QU_CODE5
                        '',                                           // QuikCallIICalls-QU_TONE6TXFRE
                        '',                                           // QuikCallIICalls-QU_CODE6
                        '',                                           // QuikCallIICalls-QU_TONE7TXFRE
                        '',                                           // QuikCallIICalls-QU_CODE7
                        '',                                           // QuikCallIICalls-QU_TONE8TXFRE
                        '',                                           // QuikCallIICalls-QU_CODE8
                        '',                                           // QuikCallIICalls-QU_TONE9TXFRE
                        '',                                           // QuikCallIICalls-QU_CODE9
                        '',                                           // QuikCallIICalls-QU_TONE0TXFRE
                        '',                                           // QuikCallIICalls-QU_CODE0
                    ]);

                const csvContent = [
                    headers.join(','),
                    ...processedRows.map(row => row.join(','))
                ].join('\n');

                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'contacts.csv';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                messageContainer.innerHTML = `
                    <div class="message success">
                        Success: The contact list has been created and downloaded.
                    </div>`;
            })
            .catch(error => {
                messageContainer.innerHTML = `
                    <div class="message error">
                        Error: Unable to download the contact list. Please try again later.
                    </div>`;
            });
    });
});