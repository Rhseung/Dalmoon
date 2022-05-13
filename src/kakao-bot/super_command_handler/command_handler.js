/** Super Command Handler
 * @author Rhseung
 * @version alpha: 2022.05.07 ~ 2022.05.13
 */

/**
 * @class botCommandLibrary class
 * `lib` registered command collection  
 * `configFunctions` command config functions collection
 */
function botCommandLibrary() {
    this.lib = [];
    this.configFunctions = {
        canDM: (msg) => !msg.isGroupChat && !msg.isDebugRoom,
        canGroupChat: (msg) => msg.isGroupChat,
        activateRooms: (msg, value) => value.includes(msg.room) && value.length != 0
        // allowMinimumLevel: (msg, value) => msg.allowLevel >= value
    };

    // for (config in this.configFunctions) {
    //     if (config(msg, command[config]) == false) return;
    // }
}

botCommandLibrary.prototype = {
    register: function(command) {
        this.lib.push(command);
    },

    makeConfig: function(configname, func) {
        this.configFunctions[configname] = func;
    },

    execute: function(msg) {
        var args = msg.args;

        var command = this.lib.find(p_command => p_command(msg.command).name.includes(msg.command));
        if (command == null) 
            return;
        else 
            command = command(msg.command);

        for (configname in command.configs) {
            if (this.configFunctions[configname](msg, command.configs[configname]) == false) return;
        }

        // todo addArguments 구현 안됨
        // todo matchf가 constructor function 인 경우 형변환
        while (args.length > 0 && command.subcommand.length > 0) {
            let isEnd = command.many;

            command = command.subcommand.find(subcomd => {
                var subcmd = subcomd(args[0]);

                if (command.matchf == null) return true;
                return (subcmd.name.length > 0) ? subcmd.name.includes(args[0]) && command.matchf(args[0], msg) : command.matchf(args[0], msg);
            });

            if (command == null) return;

            command = isEnd ? command(args) : command(args[0]);

            for (configname in command.configs) {
                if (this.configFunctions[configname](msg, command.configs[configname]) == false) return;
            }
            args = args.slice(1);
        }

        if (command.runcode == null) return;

        function runAccordingType(e) {
            switch (e.constructor) {
                case String:
                case Number:
                    return e;
                case Array:
                    let idx = Math.floor(Math.random() * (e.length-1));
                    return runAccordingType(e[idx]);
                case Function:
                    return e(msg);
                default:
                    throw new TypeError('Syntax: botCommand.run(String | Number | Array | Function)\n' + 'You: botCommand.run('+e.constructor.name+')');
            }
        }

        return runAccordingType(command.runcode);
    }
};

/**
 * @class botCommand class  
 * `name` command's name including aliases  
 * `match` match that use it for choosing commands when command doesn't have names  
 * `description` command's description. use for help command  
 * `configs` command's config. canGroupChat or canDM or something like this  
 * `run` command's run  
 * `subcommand` command's argument  
 * `endcommand` command's end command, no more arguments
 */
function botCommand() {
    // 필수
    this.name = Array.from(arguments);
    this.matchf;

    // 선택
    this.description = '';
    this.configs = {};
    this.many = false;
    
    // child
    this.runcode;
    this.subcommand = [];
}

botCommand.prototype = {
    /**
     * @param {String[]} aliases
     * @example new botCommand().setName('name1', 'name2', 'name3', ... etc);
     */
    setName: function() {
        this.name = Array.from(arguments);

        return this;
    },

    /**
     * @param {String} description 
     * @example new botCommand().setDescription('description')
     */
    setDescription: function(description) {
        this.description = description;

        return this;
    },

    /**
     * @param {Object} configs 
     * @example new botCommand().setConfigs({ config1: true, config2: false, ... etc })
     */
    setConfigs: function(configs) {
        this.configs = configs;

        return this;
    },

    /**
     * @param {Function} match 
     * @param {botCommand} subcommand 
     * @example new botCommand().addArgument(String, argname => new botCommand().addArgument(... etc) ... etc)
     * @example new botCommand().addArgument(msg => msg.author.name.startsWith("@"), username => new botCommand().addArgument(... etc) ... etc)
     */
    addArgument: function(match, subcommand) {
        this.matchf = match;

        // todo 상속 어케할지 고민해봐야됨
        // subcommand().description = subcommand().description || this.description;
        // subcommand().configs = Object.keys(subcommand().configs).length == 0 ? this.configs : subcommand().configs;
        this.subcommand.push(subcommand);

        return this;
    },

    /**
     * @param {Function} match 
     * @param {botCommand} endcommand 
     * @example new botCommand().addArguments(Number, numbers => new botCommand().run(... etc) ... etc)
     */
    addArguments: function(match, endcommand) {
        this.matchf = match;
        this.many = true;

        // todo 상속 어케할지 고민해봐야됨
        // delete endcommand().addArgument;
        // delete endcommand().addArguments;
        // endcommand().description = endcommand().description || this.description;
        // endcommand().configs = Object.keys(endcommand().configs).length == 0 ? this.configs : endcommand().configs;
        this.subcommand.push(endcommand);

        return this;
    },

    /**
     * @param {String | Number | any[] | Function} e 
     * @returns result of run according e's type  
     * `String` return String  
     *   
     * `Number` return Number  
     *   
     * `Array` return random item of Array  
     *      if item type is Array: return random element of item  
     *          if element type is Array: return random value of element  
     *             ... repeat  
     *   
     * `Function` return Function(msg)
     * 
     * @example new botCommand().run(3)
     * @example new botCommand().run("hello world")
     * @example new botCommand().run([1, 2, 3])
     * @example new botCommand().run([1, [2, [msg => msg.reply(3), "4"]], 5])
     * @example new botCommand().run(msg => msg.reply("hello world"))
     */
    run: function(e) {
        this.runcode = e;
        
        return this;
    }
};

module.exports = {
    botCommand: botCommand,
    botCommandLibrary: botCommandLibrary
};