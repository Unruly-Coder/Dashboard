/*! jEmitter - v0.1.0 - 2013-09-15
* Copyright (c) 2013 Paweł Bród; Licensed  */
var jEmitter = jEmitter || {};

(function(o, undefined) {
'use strict';

	o.Particle = function(x, y, vx, vy, settings) {
		if(!(this instanceof o.Particle)) {
			return new o.Particle(x, y, vx, vy, settings);
		}

		this.init(x,y,vx,vy, settings);	
	}

	o.Particle.prototype.init = function(x, y, vx, vy, settings) {

		if(!this.position) {
			this.position = new o.Vector(x, y);
			this.velocity = new o.Vector(vx, vy);
		} else {
			this.position.x = x;
			this.position.y = y;
			this.velocity.x = vx;
			this.velocity.y = vy;
		}

		this.size	  	 = settings.size 	   || 15;
		this.sizeStep 	 = settings.sizeStep   || 0;
		this.gravity  	 = settings.gravity    || 0;	
		this.wind 	  	 = settings.wind 	   || 0;
		this.color    	 = settings.color      || '#000000';
		this.alpha	  	 = settings.alpha	   || 1;
		this.fadeStep 	 = settings.fadeStep   || 0;
		this.rotateStep  = settings.rotateStep || 0;
		this.rotateAngle = 0;
		this.alive 	  	 = true;
	}

	o.Particle.prototype.move = function() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		this.velocity.x += this.wind;
		this.velocity.y += this.gravity;

		this.alpha -= this.fadeStep;

		this.size += this.sizeStep;

		this.rotateAngle += this.rotateStep;

		if(this.size < 1 || this.alpha < 0.1) {
			this.alive = false;
		}
	}
})(jEmitter);
var jEmitter = jEmitter || {};

(function(o, undefined) {
'use strict';

	o.ParticleEmitter = function(settings) {
		if(!(this instanceof o.ParticleEmitter)) {
			return new o.ParticleEmitter(settings);
		}

		settings = settings || {};
		this.particles = [];
		this.pool 	   = [];

		this.poolSize 		    = settings.poolSize			 || 250;
		this.maxParticleEmit	= settings.maxParticleEmit 	 || 4;
		this.minParticleEmit	= settings.minParticleEmit 	 || 1;
		this.maxSize 			= settings.maxSize 		   	 || 1;
		this.minSize 			= settings.minSize 		   	 || 5;
		this.maxSizeStep		= settings.maxSizeStep		 ||	0;
		this.minSizeStep		= settings.minSizeStep		 || 0;
		this.maxGravity 		= settings.maxGravity 	   	 || 0;
		this.minGravity 		= settings.minGravity 	   	 || 0;
		this.maxWind 			= settings.maxWind 	   	   	 || 0;
		this.minWind 			= settings.minWind 	   	   	 || 0;
		this.spreadX 			= settings.spreadX 		   	 || 0;
		this.spreadY 			= settings.spreadY 		   	 || 0;
		this.minVelocity		= settings.minVelocity	   	 || 3;
		this.maxVelocity		= settings.maxVelocity	   	 || 5;
		this.minVelocityRadius	= settings.minVelocityRadius || 0;
		this.maxVelocityRadius	= settings.maxVelocityRadius || 360;
		this.equalRadius		= settings.equalRadius		 || false;
		this.minRotateStep		= settings.minRotateStep	 || 0;
		this.maxRotateStep		= settings.maxRotateStep	 || 0;
		this.colors				= settings.colors			 || ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];
		this.minAlpha			= settings.minAlpha			 || 100;
		this.maxAlpha			= settings.maxAlpha			 || 100;
		this.minFadeStep		= settings.minFadeStep		 || 0;
		this.maxFadeStep		= settings.maxFadeStep		 || 0;
		this.image 			    = settings.image;

		this.TWO_PI   = 2 * Math.PI;		
		this.RAD_CONS = Math.PI/180;
	}

	o.ParticleEmitter.prototype.emit = function(x, y) {
		
		var random = o.utils.random,
			max = random(this.minParticleEmit, this.maxParticleEmit),
			particle,
			size,
			sizeStep,
			gravity,
			wind,
			positionX,
			positionY,
			color,
			alpha,
			fadeStep,
			rotateStep,
			velocity,
			velocityRadius,
			radians,
			velocityX,
			velocityY;
		
		for (var i = 0; i < max; i++ ) {

				size   	   = random(this.minSize, this.maxSize);
				sizeStep   = random(this.minSizeStep, this.maxSizeStep)/100;
				gravity    = random(this.minGravity, this.maxGravity)/100;
				wind 	   = random(this.minWind, this.maxWind)/100;
				positionX  = random(x-this.spreadX, x + this.spreadX);
				positionY  = random(y-this.spreadY, y + this.spreadY);
				color 	   = this.colors[Math.floor((Math.random() * this.colors.length))];
				alpha 	   = random(this.minAlpha, this.maxAlpha)/100;
				fadeStep   = random(this.minFadeStep, this.maxFadeStep)/100;
				rotateStep = random(this.minRotateStep, this.maxRotateStep);
				velocity   = random(this.minVelocity, this.maxVelocity);

				 if(this.equalRadius) {
				 	velocityRadius = this.minVelocityRadius + (((this.maxVelocityRadius - this.minVelocityRadius) / (max)) * i);
					console.log(max, velocityRadius);
				 } else {
				 	velocityRadius = random(this.minVelocityRadius, this.maxVelocityRadius);
				 }
							
				radians   	   = (velocityRadius + 90) * (this.RAD_CONS);
				velocityX 	   = Math.sin(radians) * velocity;
				velocityY 	   = Math.cos(radians) * velocity;

			if(this.particles.length >= this.poolSize) {
				this.pool.push(this.particles.shift());
			}

			if(this.pool.length) {
				particle = this.pool.pop();
				particle.init(positionX, 
					positionY, 
					velocityX, 
					velocityY, {
						size 	 	: size,
						sizeStep 	: sizeStep,
						gravity  	: gravity,
						wind 	 	: wind, 
						color 	 	: color,
						alpha	 	: alpha,
						fadeStep 	: fadeStep,
						rotateStep : rotateStep,
					});
			} else {
				particle = new o.Particle(
					positionX, 
					positionY, 
					velocityX, 
					velocityY, {
						size 	   : size,
						sizeStep   : sizeStep,
						gravity    : gravity,
						wind 	   : wind, 
						color	   : color,
						alpha	   : alpha,
						fadeStep   : fadeStep,
						rotateStep : rotateStep,
					});
			}

            this.particles.push(particle);
        }

	}

	o.ParticleEmitter.prototype.update = function() {
		for(var i = this.particles.length-1; i >= 0; i--) {
			if(this.particles[i].alive) {
				this.particles[i].move();	
			} else {
				this.pool.push(this.particles.splice(i,1)[0])
			}
		}
	}

	o.ParticleEmitter.prototype.draw = function(ctx, j) {
		var particle = this.particles[j],
			halfSize = particle.size/2;

		ctx.save();
		ctx.globalAlpha = particle.alpha;
		ctx.translate(particle.position.x, particle.position.y)
		ctx.rotate(particle.rotateAngle * this.RAD_CONS);
		if(!this.image) {
				ctx.beginPath();
				ctx.arc(-halfSize,
						-halfSize,
						particle.size,
						0,
						this.TWO_PI);
		
			ctx.fillStyle = particle.color;
			ctx.fill();	
		} else {
			ctx.drawImage(this.image, 
						  -halfSize, 
						  -halfSize, 
						  particle.size, 
						  particle.size);
		}
		ctx.restore();
	}

	o.ParticleEmitter.prototype.render = function(ctx) {

		this.update();

		for(var i = this.particles.length-1; i > -1; i--) {
			this.draw(ctx, i);
		}
	}



})(jEmitter)
var jEmitter = jEmitter || {};

(function(o, undefined) {
'use strict';

	o.utils = {
		random : function(min, max) {
			return Math.floor(Math.random() * (max- min+ 1)) + min;
		},
		hexToRgb : function(hex) {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    	return result ? {
		        r: parseInt(result[1], 16),
		        g: parseInt(result[2], 16),
		        b: parseInt(result[3], 16)
	    	} : null;
		}, 
	}	   
})(jEmitter)
var jEmitter = jEmitter || {};

(function(o, undefined) {
'use strict';

	 o.Vector = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}

})(jEmitter);