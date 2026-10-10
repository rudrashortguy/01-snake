.PHONY: dev test lint serve

dev:
	npx serve . -l 3000

serve:
	npx serve . -l 3000

test:
	node --test tests/

lint:
	npx eslint src/ tests/

clean:
	rm -rf node_modules/ coverage/
