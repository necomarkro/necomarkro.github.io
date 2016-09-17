{
    window.NGen = {
        init: function() {
            var folder = document.getElementById("folder");
            var pack = document.getElementById("pack");
            
            for (var key in NData.startingFolder) {
                var option = document.createElement('option');
                option.value = NData.startingFolder[key];
                option.innerHTML = NData.startingFolder[key];
                folder.appendChild(option);
            }
            
            for (var key in NData.chips) {
                var option = document.createElement('option');
                option.value = NData.chips[key];
                option.innerHTML = NData.chips[key];
                pack.appendChild(option);
            }
            
            NGen.submit()
        },
        
        addChip: function() {
            var pack = document.getElementById("pack");
            var folder = document.getElementById("folder");
            var selChip = pack.options[pack.selectedIndex].text;
            
            if (folder.options.length < 30) {
                currentCount = 0;
                for (var i = 0; i < folder.options.length; i++) {
                    var chip = folder.options[i];
                    if(chip.text == selChip) {
                        currentCount += 1;
                    }
                }
                if (currentCount < 4) {
                    var option = document.createElement('option');
                    option.value = selChip;
                    option.innerHTML = selChip;
                    folder.appendChild(option);
                }
            }            
        },
        
        removeChip: function() {
            var folder = document.getElementById("folder");
            folder.remove(folder.selectedIndex);
        },
        
        submit: function() {
            var folder = document.getElementById("folder");
            if (folder.options.length == 30) {
                var chips = [];
                var code = ""
                for (var i = 0; i < folder.options.length; i++) {
                    var chip = folder.options[i].text;
                    var chipID = NData.chips.indexOf(chip);
                    chips[i] = chipID;
                    code += ('00'+chips[i].toString(36)).slice(-2).toUpperCase();
                }               
                document.getElementById("code").value = code;
            }
        },
    }
}