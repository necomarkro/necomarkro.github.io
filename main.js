{
    window.NGen = {
        init: function() {
            function fillSelect(select, data) {
                for (var key in data) {
                    var option = document.createElement('option');
                    option.value = data[key];
                    option.innerHTML = data[key];
                    select.appendChild(option);
                }
            }
            
            var folder = document.getElementById("folder");
            var pack = document.getElementById("pack");
            var mod0A = document.getElementById("mod0A");
            var mod0B = document.getElementById("mod0B");
            var mod0C = document.getElementById("mod0C");
            var mod0D = document.getElementById("mod0D");
            var mod0E = document.getElementById("mod0E");
            
            fillSelect(folder, NData.startingFolder);
            fillSelect(pack, NData.chips);
            fillSelect(mod0A, NData.modcard0A);
            fillSelect(mod0B, NData.modcard0B);
            fillSelect(mod0C, NData.modcard0C);
            fillSelect(mod0D, NData.modcard0D);
            fillSelect(mod0E, NData.modcard0E);            
            
            NGen.update()
            NGen.modupdate()
        },
        
        addChip: function() {
            var pack = document.getElementById("pack");
            var folder = document.getElementById("folder");
            var selChip = pack.options[pack.selectedIndex].text;
            
            if (folder.options.length < 30) {
                var chipID = NData.chips.indexOf(selChip);
                var currentCount = 0;
                var megas = 0;
                var gigas = 0;
                
                for (var i = 0; i < folder.options.length; i++) {
                    var chip = folder.options[i];
                    if(chip.text == selChip) {
                        currentCount++;
                    }
                    if(NData.chips.indexOf(chip.text) >= 0x121) {
                        gigas++;        
                    }else if(NData.chips.indexOf(chip.text) >= 0xC9) {
                        megas++;
                    }
                }
                if (chipID >= 0x121) {
                    if (currentCount < 1 && gigas < 1) {
                        var option = document.createElement('option');
                        option.value = selChip;
                        option.innerHTML = selChip;
                        folder.appendChild(option);
                    }
                }else if (chipID >= 0xC9) {
                    if (currentCount < 1 && megas < 5) {
                        var option = document.createElement('option');
                        option.value = selChip;
                        option.innerHTML = selChip;
                        folder.appendChild(option);
                    }
                }else {
                    if (currentCount < 4) {
                        var option = document.createElement('option');
                        option.value = selChip;
                        option.innerHTML = selChip;
                        folder.appendChild(option);
                    }
                }                
            }
            
            NGen.update()
        },
        
        removeChip: function() {
            var folder = document.getElementById("folder");
            folder.remove(folder.selectedIndex);
            NGen.update()
        },
        
        update: function() {
            var folder = document.getElementById("folder");
            if (folder.options.length == 30) {
                var code = ""                
                for (var i = 0; i < folder.options.length; i++) {
                    var chip = folder.options[i].text;
                    var chipID = NData.chips.indexOf(chip);
                    code += ('00'+chipID.toString(36)).slice(-2).toUpperCase();
                }               
                document.getElementById("code").value = code;
            }
        },
        
        modupdate: function() {
            function getValue(mod, data) {
                if (mod == "None") {
                    return "FF"
                }else {
                    var modID = data.indexOf(mod)
                    return ('00'+modID.toString(16)).slice(-2).toUpperCase();
                }
            }
            var mod0A = document.getElementById("mod0A").value;
            var mod0B = document.getElementById("mod0B").value;
            var mod0C = document.getElementById("mod0C").value;
            var mod0D = document.getElementById("mod0D").value;
            var mod0E = document.getElementById("mod0E").value;
            
            var code = ""
            code += getValue(mod0A, NData.modcard0A)
            code += getValue(mod0B, NData.modcard0B)
            code += getValue(mod0C, NData.modcard0C)
            code += getValue(mod0D, NData.modcard0D)
            code += getValue(mod0E, NData.modcard0E)
            
            document.getElementById("modcode").value = code;
        },
    }
}