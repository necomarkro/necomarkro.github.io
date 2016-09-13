{
    var selectedTile = 1;
    var selectedViruses = []
    
    window.VB = {
        init: function() {
            var s = document.getElementById("virus-select")
            for (var key in VBData.viruses) {
                var option = document.createElement('option');
                option.value = VBData.viruses[key];
                option.innerHTML = VBData.viruses[key];
                s.appendChild(option)
                console.log(key)
            }
            
            for (var i = 1; i <= 9; i++) {
                selectedViruses[i] = 0;
            }
        },        
        
        update: function()
        {
            var virusName = document.getElementById("virus-select").value;
            var virus = VBData.viruses.indexOf(virusName);
            console.log(virus);
            selectedViruses[selectedTile] = virus
            
            var img = document.getElementById("virus-" + selectedTile);   
            if (virus == 0) {
                img.src = "";
            } else {
                img.src = 'viruses/' + virus + '.png';
            }
        },
        
        switchTile: function(tile)
        {
            selectedTile = tile;
            document.getElementById("virus-select").selectedIndex = selectedViruses[selectedTile];
        },
        
        loadCode: function()
        {
            
        },
        
        generateCode: function()
        {
            function pad(num, size) {
                var s = num+"";
                while (s.length < size) s = "0" + s;
                return s;
            }
            
            var code = ""
            for (var i = 1; i <= 9; i++) {
                if (selectedViruses[i] != 0) {
                    var x = i % 3;
                    if (x == 0) x = 3;
                    var y = Math.floor((i - 1) / 3) + 1;
                    if (code != "") code += "-"
                    code += pad(selectedViruses[i].toString(16).toUpperCase(), 2);
                    code += x;
                    code += y;
                }
            }
            
            console.log(code);
            document.getElementById('code').value = code;
        },
    }
}